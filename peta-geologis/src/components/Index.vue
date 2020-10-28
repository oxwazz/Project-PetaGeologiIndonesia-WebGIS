<template>
<div>   
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Peta Geologi Indonesia</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div v-if="statusLogin" class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                </button>
                <div class="dropdown-menu dropdown-menu-lg-right">
                    <form action = "" method = "post" class="px-4 py-3">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input v-model="username" type="text" class="form-control" name="username" id="username">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input v-model="password" type="password" class="form-control" name="password" id="password">
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="dropdownCheck">
                                <label class="form-check-label" for="dropdownCheck">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <button @click.prevent="login" type="submit" name="login" class="btn btn-primary">Login</button>
                    </form>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item" @click="navigateToRegister">New around here? Register</button>
                </div>
            </div>
        </div>
    </nav>

    <section id="home" class="home">
        <div class="container">
            <div class="jumbotron jumbotron-fluid" style="background-color: white">
                <div class="card border-white mb-3" style="max-width: auto;">
                    <div class="row no-gutters">
                        <div class="col-md-5 ">
                            <img src="../../public/img/globe.png" class="card-img" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h2 class="card-title">Tentang Situs Ini:</h2>
                                <p>Situs ini menyediakan data peta tematik dari wilayah Indonesia. Tersedia juga peta tematik yang memiliki data koordinat georeferensi, yang dapat digunakan
                                    bagi anda pengguna perangkat lunak GIS untuk melakukan pengolahan pada peta tematik.</p>
                                <p>Anda dapat melakukan pencarian peta secara visual dan dapat mengakses informasi rinci dengan mengklik salah satu cell tertentu.</p>
                                <p><a @click="navigateToPeta" class="btn btn-primary">Cari Peta</a></p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>   
        </div>
    </section>

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
import axios from 'axios'
import peta from '../services/petaServices'


function navigateToPeta() {
    this.$router.push('/peta')
}

function navigateToRegister() {
    this.$router.push('/register')
}

async function login() {
    const input = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
    })

    if (input.data.error) {
        return console.log('login error')
    }
    
    localStorage.setItem('token', JSON.stringify(input.data))

    this.$router.push('/admin/peta')
}



export default {
    data() {
        return {
            username: '',
            password: '',
            statusLogin: true
        }
    },
    methods: {
        navigateToPeta,
        navigateToRegister,
        login
    },
    async mounted() {
        const tes = await peta.deletePetaById(-1)
        if (tes.data.error) {
            this.statusLogin = true
        } else {
            this.statusLogin = false
        }
    }
}


</script>