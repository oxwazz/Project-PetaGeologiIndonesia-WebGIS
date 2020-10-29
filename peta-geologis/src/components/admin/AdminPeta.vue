<template>
<div>
    <div class="container">	
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand">Peta Geologi Indonesia</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                </ul>
                <div class="dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span>{{ username }}</span></a>
                    <div class="dropdown-menu dropdown-menu-lg-right">
                        <a class="dropdown-item" @click="logout">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <div class="container" style="margin-top: 75px">
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
        </div>

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
                                <button @click="setIdIndex(rectangle.data[i].id, i)" data-toggle="modal" data-target="#exampleModalCenter">Hapus</button>
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
                    <input type="file" accept="image/*" @change="insertImageEdit()" ref="insertImageEdit">
                    <br>
                    <br>
                    <p>File TIF:</p>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button @click="updateData()" data-dismiss="modal" class="btn btn-primary">Edit</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal hapus -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Delete Peta?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            Are you sure delete this peta?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button @click="deleteData(idIndex.id)" data-dismiss="modal" type="button" class="btn btn-danger">Delete</button>
        </div>
        </div>
    </div>
    </div>

    <!-- Modal tambah -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tambah peta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
               <input v-model="detailPeta.indexPeta" class="form-control form-control-sm mb-2" type="text" placeholder="Indeks Peta">
                <input v-model="detailPeta.skala" class="form-control form-control-sm mb-2" type="text" placeholder="Skala">
                <input v-model="detailPeta.tahun" class="form-control form-control-sm mb-2" type="text" placeholder="Tahun Terbit">
                <input v-model="detailPeta.penyusun" class="form-control form-control-sm mb-2" type="text" placeholder="Penyusun">
                <input v-model="detailPeta.penerbit" class="form-control form-control-sm mb-2" type="text" placeholder="Penerbit">

                <input v-model="detailPeta.a" class="form-control form-control-sm mb-2" type="text" placeholder="a">
                <input v-model="detailPeta.b" class="form-control form-control-sm mb-2" type="text" placeholder="b">
                <input v-model="detailPeta.c" class="form-control form-control-sm mb-2" type="text" placeholder="c">
                <input v-model="detailPeta.d" class="form-control form-control-sm mb-2" type="text" placeholder="d">

                <input type="file" accept="image/*" @change="insertImageTambah()" ref="insertImageTambah">

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button class="btn btn-primary" data-dismiss="modal" @click="createData">Tambah</button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LRectangle, LPopup, LControlLayers } from 'vue2-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import VGeosearch from 'vue2-leaflet-geosearch';
import peta from '../../services/petaServices'

// fix the marker
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.4/dist/images/";

function setIdIndex(id, index) {
    this.idIndex = { id, index }
}

async function createData() {
    let data = new FormData()
    const { lembar_peta, skala, tahun, penyusun, penerbit, a, b, c, d } = this.detailPeta

    data.append('json', `{
        "indexPeta": "${lembar_peta}",
        "skala": "${skala}",
        "tahun": "${tahun}",
        "penyusun": "${penyusun}",
        "penerbit": "${penerbit}",
        "a": "${a}",
        "b": "${b}",
        "c": "${c}",
        "d": "${d}"
    }`);
    data.append('image', this.image);
    
    await peta.createPeta(data)
    this.refreshData()
    this.loadData()
}

async function updateData() {
    let data = new FormData()
    let id = this.idIndex.id
    let index = this.idIndex.index
    const { lembar_peta, skala, tahun, penyusun, penerbit, a, b, c, d } = this.rectangle.data[index]

    data.append('json', `{
        "indexPeta": "${lembar_peta}",
        "skala": "${skala}",
        "tahun": "${tahun}",
        "penyusun": "${penyusun}",
        "penerbit": "${penerbit}",
        "a": "${a}",
        "b": "${b}",
        "c": "${c}",
        "d": "${d}"
    }`);
    data.append('image', this.image);

    await peta.putPetaById(id, data)
    this.refreshData()
    this.loadData()
}

function insertImageEdit() {
    this.image =  this.$refs.insertImageEdit.files[0]
}

function insertImageTambah() {
    this.image =  this.$refs.insertImageTambah.files[0]
}

async function deleteData(id) {
    await peta.deletePetaById(id)
    this.$refs.map.mapObject.closePopup()
    this.refreshData()
    this.loadData()
}

async function logout() {
    await peta.logoutAdmin()
    this.$router.push('/')
}

async function loadData() {
    const rows = await peta.getPeta()
    for (let i of rows.data) {
        this.rectangle.bounds.push([[i.a, i.b], [i.c, i.d]])
        this.rectangle.data.push(i)
    }
}

function refreshData() {
    this.rectangle.bounds = []
    this.rectangle.data = []

    this.$refs.insertImageEdit.value = ''
    this.$refs.insertImageTambah.value = ''
    this.image = ''
}

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
                data: [{
                    lembar_peta: '',
                    skala: '1:',
                    tahun: '',
                    penyusun: '',
                    penerbit:'',
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                }],
                style: { color: 'red', weight: 3 }
            },
            geosearchOptions: { // Important part Here
                provider: new OpenStreetMapProvider(),
            },
            detailPeta: {
                lembar_peta: 'index peta cuy',
                skala: '1:223232323',
                tahun: '2020',
                penyusun: 'Halim',
                penerbit:'Oxwazz',
                a: '5',
                b: '2',
                c: '3',
                d: '4',
            },
            idIndex: { id: 0, index: 0 },
            image: '',
            username: ''
        }
    },
    methods: {
        setIdIndex,
        createData,
        updateData,
        insertImageEdit,
        insertImageTambah,
        deleteData,
        refreshData,
        loadData,
        logout
    },
    mounted () {
        this.username = JSON.parse(localStorage.getItem('token')).username
        this.loadData()
    }
}
</script>