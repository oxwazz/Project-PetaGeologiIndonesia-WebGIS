<template>
    <div>   
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/">Peta Geologi Indonesia</a>
        </nav>

        <div class="card-body">
            <ol class="breadcrumb" style="background-color: #f6f6f6">
                <li class="breadcrumb-item">Informasi Detail Peta Geologi</li>
            </ol>
        </div>

        <div class="container">
            <div class="row">
                <table class="col-md-6 table">
                    <tr>
                        <td style="width: 120px">Indeks Peta</td>
                        <td>{{ data.lembar_peta }}</td>
                    </tr>
                    <tr>
                        <td>Skala</td>
                        <td>{{ data.skala }}</td>
                    </tr>
                    <tr>
                        <td>Tahun Terbit</td>
                        <td>{{ data.tahun }}</td>
                    </tr>
                    <tr>
                        <td>Penyusun</td>
                        <td>{{ data.penyusun }}</td>
                    </tr>
                    <tr>
                        <td>Penerbit</td>
                        <td>{{ data.penerbit }}</td>
                    </tr>
                </table>

                <div class="col-md-6">
                    <a :href="img" data-toggle="lightbox" class="col-sm-4">
                        <img :src="img" class="img-fluid border border-dark rounded">
                    </a>
                </div>
            </div>
            
            <a href="/peta">
                <button class="btn btn-danger mr-1" style="width:140px; height:43px">Kembali ke peta</button>
            </a>
            <a href="assets/peta/peta/<?php echo $d['img'] ?>" download class="btn btn-primary mr-1">
                <img src="../../public/assets/download2.png" width="110" height="28">
            </a>
            <a href="assets/peta/georeferensi/<?php echo $d['img_tif'] ?>" download class="btn btn-primary">
                <img src="../../public/assets/download3.png" width="110" height="28">
            </a>
        </div>

        <footer class="bg-dark text-white text-center"
            style="font-size: 12px; line-height: 8px; height: 130px">
            <p style="padding-top: 8px; margin-top: 8px">Dikembanngkan oleh:</p>
            <p>Muhammad Rivaldi Idris | Fatwa Ramdani, D.Sc., S.Si., M.Sc. | Welly Purnomo, S.T., M.Kom.</p>
            <p>Grup Induksi Riset Geoinformatika</p>  
            <p>Universitas Brawijaya</p>
            <p>Malang, Indonesia</p>
        </footer>
    </div>
</template>

<script>
const axios = require('axios')

export default {
    data() {
        return {
            data: [],
            img: ''
        }
    },
    async mounted() {
        const { id } = this.$route.params
        const { data } = await axios.get(`http://localhost:3000/peta/${id}`)
        this.data = data[0]
        this.img = `http://localhost:3000/peta/photo/${id}`
    }
}
</script>