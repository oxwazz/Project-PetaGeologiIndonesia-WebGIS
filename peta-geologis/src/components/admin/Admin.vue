<template>
    <div class="container">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Tambah Peta
        </button>

        <!-- Modal -->
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

                    <input type="file" accept="image/*" @change="uploadImage()" ref="fileInput">
                    
                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button class="btn btn-primary" data-dismiss="modal" @click="createData">Tambah</button>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <br>
        <p class="d-inline font-weight-bold">Page: </p>
        <button @click="previous">prev</button>
        <input @keyup.enter="onEnter" v-model="page" type="text" style="width: 40px" class="text-center">
        <button @click="next" class="mb-2">next</button>
        <br>
        <p class="d-inline font-weight-bold">Show: </p>
        <input @keyup.enter="onEnter" v-model="show" type="text" style="width: 40px" class="text-center">

        <!-- table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Index Peta</th>
                    <th scope="col">Skala</th>
                    <th scope="col">Tahun</th>
                    <th scope="col">Penyusun</th>
                    <th scope="col">Penerbit</th>
                    <th scope="col">A</th>
                    <th scope="col">B</th>
                    <th scope="col">C</th>
                    <th scope="col">D</th>
                    <th scope="col">Edit?</th>
                    <th scope="col">Delete?</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows" :key="row.lembar_peta">
                    <th scope="row">{{ row.id }}</th>
                    <td>{{ row.lembar_peta }}</td>
                    <td>{{ row.skala }}</td>
                    <td>{{ row.tahun }}</td>
                    <td>{{ row.penyusun }}</td>
                    <td>{{ row.penerbit }}</td>
                    <td>{{ row.a }}</td>
                    <td>{{ row.b }}</td>
                    <td>{{ row.c }}</td>
                    <td>{{ row.d }}</td>
                    <td><button @click="selectRow(row.id, index)" data-toggle="modal" data-target="#exampleModal2">Edit</button></td>
                    <td><button @click="deleteData(row.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>

        <!-- Modal edit-->
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
                    <input v-model="rows[selectedRow.index].lembar_peta" class="form-control form-control-sm mb-2" type="text" placeholder="Indeks Peta">
                    <input v-model="rows[selectedRow.index].skala" class="form-control form-control-sm mb-2" type="text" placeholder="Skala">
                    <input v-model="rows[selectedRow.index].tahun" class="form-control form-control-sm mb-2" type="text" placeholder="Tahun Terbit">
                    <input v-model="rows[selectedRow.index].penyusun" class="form-control form-control-sm mb-2" type="text" placeholder="Penyusun">
                    <input v-model="rows[selectedRow.index].penerbit" class="form-control form-control-sm mb-2" type="text" placeholder="Penerbit">

                    <input v-model="rows[selectedRow.index].a" class="form-control form-control-sm mb-2" type="text" placeholder="a">
                    <input v-model="rows[selectedRow.index].b" class="form-control form-control-sm mb-2" type="text" placeholder="b">
                    <input v-model="rows[selectedRow.index].c" class="form-control form-control-sm mb-2" type="text" placeholder="c">
                    <input v-model="rows[selectedRow.index].d" class="form-control form-control-sm mb-2" type="text" placeholder="d">
                    <br>
                    <p>File IMG: {{ rows[selectedRow.index].img }}</p>
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

export default {
    data() {
        return {
            page: 1,
            show: 7,
            detailPeta: {
                indexPeta: 'index peta cuy',
                skala: '1:223232323',
                tahun: '2020',
                penyusun: 'Halim',
                penerbit:'Oxwazz',
                a: '5',
                b: '2',
                c: '3',
                d: '4',
            },
            image: '',
            rows: [],
            selectedRow: { id: 0, index: 0 }
        }
    },
    async mounted() {
        const rows = await axios.get('http://localhost:3000/peta?page=1&show=7')
        this.rows = rows.data
        this.page = 1
    },
    methods: {
        async previous() {
            this.page--
            if (this.page <= 0) {
                this.page = 1
            }
            this.refreshData()
        },
        async next() {
            this.page++
            this.refreshData()
        },
        async onEnter() {
            this.refreshData()
        },
        async createData() {
            let data = new FormData()

            data.append('json', `{
                "indexPeta": "${this.detailPeta.indexPeta}",
                "skala": "${this.detailPeta.skala}",
                "tahun": "${this.detailPeta.tahun}",
                "penyusun": "${this.detailPeta.penyusun}",
                "penerbit": "${this.detailPeta.penerbit}",
                "a": "${this.detailPeta.a}",
                "b": "${this.detailPeta.b}",
                "c": "${this.detailPeta.c}",
                "d": "${this.detailPeta.d}"
            }`);

            data.append('image', this.image);
            
            await axios.post('http://localhost:3000/peta', data, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            this.refreshData()

            this.$refs.fileInput.value = ''
            this.image = ''
        },
        uploadImage() {
            this.image =  this.$refs.fileInput.files[0]
        },
        async deleteData(id) {
            await axios.delete(`http://localhost:3000/peta/${id}`)
            this.refreshData()
        },
        async selectRow(id, index) {
            this.selectedRow = { id, index }
        },
        async updateData() {
            let coba = new FormData()
            let id = this.selectedRow.id
            let index = this.selectedRow.index

            coba.append('json', `{
                "indexPeta": "${this.rows[index].lembar_peta}",
                "skala": "${this.rows[index].skala}",
                "tahun": "${this.rows[index].tahun}",
                "penyusun": "${this.rows[index].penyusun}",
                "penerbit": "${this.rows[index].penerbit}",
                "a": "${this.rows[index].a}",
                "b": "${this.rows[index].b}",
                "c": "${this.rows[index].c}",
                "d": "${this.rows[index].d}"
            }`);

            coba.append('image', this.image);

            await axios.put(`http://localhost:3000/peta/${id}`, coba, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            
            this.refreshData()

            this.$refs.fileInputEdit.value = ''
            this.image = ''
        },
        editImage() {
            this.image =  this.$refs.fileInputEdit.files[0]
        },
        async refreshData() {
            const rows = await axios.get(`http://localhost:3000/peta?page=${this.page}&show=${this.show}`)
            this.rows = rows.data
        }
    }
}
</script>