<template>
    <div>   
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/">Peta Geologi Indonesia</a>
        </nav>

        <div class="container" style="margin-top: 80px">
            <div class="row no-gutters">
                <img class="card-img col-md-5" src="../../public/img/globe.png">

                <div class="col-md-7 p-4">
                    <h2 class="card-title">Tentang Situs Ini:</h2>
                    <p>Situs ini menyediakan data peta tematik dari wilayah Indonesia. Tersedia juga peta tematik yang memiliki data koordinat georeferensi, yang dapat digunakan
                    bagi anda pengguna perangkat lunak GIS untuk melakukan pengolahan pada peta tematik.</p>
                    <p>Anda dapat melakukan pencarian peta secara visual dan dapat mengakses informasi rinci dengan mengklik salah satu cell tertentu.</p>
                    <p><button class="btn btn-primary" @click="navigateToPeta()">Cari Peta</button></p>
                </div>
            </div>
        </div>

        <footer class="bg-dark text-white text-center fixed-bottom"
            style="font-size: 12px; line-height: 8px;">
            <p style="margin-top: 8px">Dikembanngkan oleh:</p>
            <p>Muhammad Rivaldi Idris | Fatwa Ramdani, D.Sc., S.Si., M.Sc. | Welly Purnomo, S.T., M.Kom.</p>
            <p>Grup Induksi Riset Geoinformatika</p>  
            <p>Universitas Brawijaya</p>
            <p>Malang, Indonesia</p>
        </footer>
    </div>
</template>

<script>
export default {
    methods: {
        navigateToPeta() {
            this.$router.push('/peta')
        }
    }
}
</script>