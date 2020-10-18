<template>
    <div>
        <div id="mapid" style="height: 100vh"></div>
    </div>
</template>

<script>
const axios = require('axios')

export default {
    async mounted() {
        var L = window.L;

        var mymap = L.map('mapid').setView([-0.789275, 113.921326], 5);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }).addTo(mymap);

        // create the geocoding control and add it to the map
        let searchControl = L.esri.Geocoding.geosearch().addTo(mymap);
    
        // create an empty layer group to store the results and add it to the map
        let results = L.layerGroup().addTo(mymap);
    
        // listen for the results event and add every result to the map
        searchControl.on("results", () => {
            results.clearLayers();
        });

        // create a red polygon from an array of LatLng points
        const petas = await axios.get('http://localhost:3000/peta')
       
        for (let peta of petas.data) {
            L.polygon([
                    [peta.a, peta.b],
                    [peta.c, peta.b],
                    [peta.c, peta.d],
                    [peta.a, peta.d]
                    ], {color: 'red'})
                .addTo(mymap)
                .bindPopup(
                    `<div style="width: 300px;">

                    <b>
                        ${peta.lembar_peta} <br>
                        ${peta.skala}
                    </b>
                    <br><br>
                    <a href="/peta/${peta.id}">More Details</a>
                    <img src="http://localhost:3000/peta/photo/${peta.id}" style="width: 300px;">
                    </div>
                    `
                )
        }
    }
}
</script>