<template>
<l-map ref="map" :zoom="zoom" :center="center" style="height:100vh">
    <l-control-zoom position="bottomright"></l-control-zoom>
    <v-geosearch :options="geosearchOptions" ></v-geosearch>
    <l-control-fullscreen position="topleft"></l-control-fullscreen>
    <l-control-layers position="topright"></l-control-layers>
    <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        layer-type="base"/>
    <div>
        <l-rectangle ref="rec" v-for="(data, i) in rectangle.bounds" :key="i" :bounds="data" :l-style="rectangle.style" >
            <l-popup style="width: 300px;">
                {{ rectangle.data[i].lembar_peta }}<br>
                {{ rectangle.data[i].skala }}<br><br><br>
                <a :href="`/peta/${rectangle.data[i].id}`">More Details</a><br><br>
                <img :src="`http://localhost:3000/peta/${rectangle.data[i].id}/photo?t=${rectangle.data[i].img}`" style="width: 300px;"><br>
            </l-popup>
        </l-rectangle>
    </div>
</l-map>
</template>

<script>
import L from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { LMap, LTileLayer, LRectangle, LPopup, LControlLayers, LControlZoom } from 'vue2-leaflet'
import VGeosearch from 'vue2-leaflet-geosearch'
import LControlFullscreen from 'vue2-leaflet-fullscreen'
import peta from '../services/petaServices'

// fix the marker
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";

export default {
    components: { LMap, LTileLayer, LRectangle, LPopup, LControlLayers, LControlZoom, VGeosearch, LControlFullscreen },
    data () {
        return {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            center: [-0.789275, 113.921326],
            zoom: 5,
            tileProviders: [
                {
                    name: 'ArcGISMap World Imagery',
                    visible: true,
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                },
                {
                    name: 'OpenStreetMap',
                    visible: false,
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                }
            ],
            rectangle: {
                bounds: [],
                data: [],
                style: { color: 'red', weight: 3 }
            },
            geosearchOptions: { // Important part Here
                provider: new OpenStreetMapProvider(),
            },
        }
    },
    
    async mounted () {
        // delete zoom default
       this.$refs.map.mapObject.zoomControl.remove()

        const rows = await peta.getPeta()
        for (let i of rows.data) {
            this.rectangle.bounds.push([[i.a, i.b], [i.c, i.d]])
            this.rectangle.data.push(i)
        }
    }
}
</script>