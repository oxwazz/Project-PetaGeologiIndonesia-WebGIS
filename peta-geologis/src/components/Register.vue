<template>
<body>
    <h1 align="center">Halaman Registrasi</h1>
    <div class="row justify-content-center align-items-center h-75">
        <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-3">   
            <form action="" method="post">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input v-model="username" type="text" class="form-control" name="username" id="Username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" class="form-control" name="password" id="password">
                </div>
                <div class="form-group">
                    <label for="password2">Konfirmasi Password</label>
                    <input v-model="konfirmasiPassword"  type="password" class="form-control" name="password2" id="password2">
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <button @click.prevent="checkInput" name="register" class="btn btn-primary text-center">Submit</button>
                        </div>
                    </div>
                </div>		
            </form>
        </div>
    </div>
</body>
</template>

<script>
import axios from 'axios'

async function checkInput() {
    const rows = await axios.post('http://localhost:3000/register', {
        username: this.username,
        password: this.password,
        konfirmasiPassword: this.konfirmasiPassword
    })
    if (rows.data.error) {
        console.log('error register')
        return 'error register'
    }

    this.$router.push('/')
}

export default {
    data() {
        return {
            username: '',
            password: '',
            konfirmasiPassword: ''
        }
    },
    methods: {
        checkInput
    }
}
</script>