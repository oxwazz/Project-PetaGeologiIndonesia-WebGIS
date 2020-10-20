<template>
<div>
    <!-- <div class="container">	
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand">Peta Geologi Indonesia</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                </ul>
                <div class="dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span>username</span><img src="account.svg" width="36" height="36"></a>
                    <div class="dropdown-menu dropdown-menu-lg-right">
                        <a class="dropdown-item" href="login.html">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <div class="container" style="margin-top: 40px">
        <div class="card shadow mb-4">
            <!-- Card Header - Dropdown -->
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Selamat Datang</h6>
            </div>
                <!-- Card Body -->
            <div class="card-body">
                <div class="chart-area">
                    <div class="alert alert-dismissible" role="alert" style="background-color: #eaeaea">
                        <h4><b>Kelola Peta Geologi!</b></h4>
                        <ol>
                        <li>Pilih lokasi yang sudah dibagi ke dalam grid</li>
                        <li>Akan muncul pop-up box berisikan thumbnail gambar peta dan button upload file gambar terbaru</li>
                        </ol>     
                    </div>
                </div>
            </div>
        </div> -->

        <div class="card shadow">
            <!-- Card Header - Dropdown -->
            <div class="card-header d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Peta</h6>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><h6 class="m-0 font-weight-bold">Add New</h6></button>
            </div>
            <!-- Card Body -->
            <div class="card-body">
                <!-- <div id="mapid" style="height: 600px; width:100%"></div> -->
                <l-map ref="map" :zoom="zoom" :center="center" style="height: 600px; width:100%">
                    <v-geosearch :options="geosearchOptions" ></v-geosearch>
                    <l-control-layers position="topright"></l-control-layers>
                    <l-tile-layer
                        v-for="tileProvider in tileProviders"
                        :key="tileProvider.name"
                        :name="tileProvider.name"
                        :visible="tileProvider.visible"
                        :url="tileProvider.url"
                        layer-type="base"/>
                    <div>
                        <l-rectangle v-for="(data, i) in rectangle.bounds" :key="i" :bounds="data" :l-style="rectangle.style" >
                            <l-popup style="width: 300px;">
                                {{ rectangle.data[i].lembar_peta }}<br>
                                {{ rectangle.data[i].skala }}<br><br><br>
                                <a :href="`/peta/${rectangle.data[i].id}`">More Details</a><br><br>
                                <img :src="`http://localhost:3000/peta/${rectangle.data[i].id}/photo?t=${rectangle.data[i].img}`" style="width: 300px;"><br>
                                <button @click="setIdIndex(rectangle.data[i].id, i)"  data-toggle="modal" data-target="#exampleModal2">Edit</button>
                                <button @click="deleteData(rectangle.data[i].id)">Hapus</button>
                            </l-popup>
                        </l-rectangle>
                    </div>
                </l-map>
            </div>
        </div>
    </div>

    

    <!-- Modal edit -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit peta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input v-model="rectangle.data[idIndex.index].lembar_peta" class="form-control form-control-sm mb-2" type="text" placeholder="Indeks Peta">
                    <input v-model="rectangle.data[idIndex.index].skala" class="form-control form-control-sm mb-2" type="text" placeholder="Skala">
                    <input v-model="rectangle.data[idIndex.index].tahun" class="form-control form-control-sm mb-2" type="text" placeholder="Tahun Terbit">
                    <input v-model="rectangle.data[idIndex.index].penyusun" class="form-control form-control-sm mb-2" type="text" placeholder="Penyusun">
                    <input v-model="rectangle.data[idIndex.index].penerbit" class="form-control form-control-sm mb-2" type="text" placeholder="Penerbit">

                    <input v-model="rectangle.data[idIndex.index].a" class="form-control form-control-sm mb-2" type="text" placeholder="a">
                    <input v-model="rectangle.data[idIndex.index].b" class="form-control form-control-sm mb-2" type="text" placeholder="b">
                    <input v-model="rectangle.data[idIndex.index].c" class="form-control form-control-sm mb-2" type="text" placeholder="c">
                    <input v-model="rectangle.data[idIndex.index].d" class="form-control form-control-sm mb-2" type="text" placeholder="d">
                    <br>
                    <p>File IMG: {{ rectangle.data[idIndex.index].img }}</p>
                    <input type="file" accept="image/*" @change="editImage()" ref="fileInputEdit">
                    <br>
                    <br>
                    <p>File TIF:</p>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="updateData()" data-dismiss="modal" class="btn btn-primary" >Edit</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
const axios = require('axios')
import L from 'leaflet';
import { LMap, LTileLayer, LRectangle, LPopup, LControlLayers } from 'vue2-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import VGeosearch from 'vue2-leaflet-geosearch';

// fix the marker
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";

export default {
    components: { LMap, LTileLayer, LRectangle, LPopup, LControlLayers, VGeosearch },
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
            idIndex: { id: 0, index: 0 },
            image: '',
            redi: ''
        }
    },

    async mounted () {
        const rows = await axios.get(`http://localhost:3000/peta`)
        for (let i of rows.data) {
            this.rectangle.bounds.push([[i.a, i.b], [i.c, i.d]])
            this.rectangle.data.push(i)
        }
    },

    methods: {
        setIdIndex(id, index) {
            this.idIndex = { id, index }
        },
        async updateData() {
            let coba = new FormData()
            let id = this.idIndex.id
            let index = this.idIndex.index

            coba.append('json', `{
                "indexPeta": "${this.rectangle.data[index].lembar_peta}",
                "skala": "${this.rectangle.data[index].skala}",
                "tahun": "${this.rectangle.data[index].tahun}",
                "penyusun": "${this.rectangle.data[index].penyusun}",
                "penerbit": "${this.rectangle.data[index].penerbit}",
                "a": "${this.rectangle.data[index].a}",
                "b": "${this.rectangle.data[index].b}",
                "c": "${this.rectangle.data[index].c}",
                "d": "${this.rectangle.data[index].d}"
            }`);

            coba.append('image', this.image);

            await axios.put(`http://localhost:3000/peta/${id}`, coba, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            this.$refs.fileInputEdit.value = ''
            this.image = ''

            // this.$router.go(0)
            this.refresh()

        },
        editImage() {
            this.image =  this.$refs.fileInputEdit.files[0]
        },
        async deleteData(id) {
            await axios.delete(`http://localhost:3000/peta/${id}`)
            // this.$router.go(0)
            this.$refs.map.mapObject.closePopup()
            this.refresh()
        },
        async refresh () {
        this.rectangle.bounds = []
        this.rectangle.data = []

        const rows = await axios.get(`http://localhost:3000/peta`)
        for (let i of rows.data) {
            this.rectangle.bounds.push([[i.a, i.b], [i.c, i.d]])
            this.rectangle.data.push(i)
        }
        }
    },


};
</script>