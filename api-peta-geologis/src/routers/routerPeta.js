const path = require('path')
const fs = require('fs')
const express = require('express')
const pool = require('../db/postgresql')
const upload = require('../middleware/upload')

const router = express.Router()

router.post('/app/status', (req, res) => {
    const coba = req.query.to
    console.log(coba)
    res.send({coba})
})

router.get('/peta', async (req, res) => {
    const page = req.query.page
    const show = req.query.show

    if (page <= 0) {
        res.send({ error: "halaman tidak ditemukan lur" })
    } else if (page) {
        const { rows } = await pool.query(`SELECT * FROM maps ORDER BY id DESC OFFSET ${page-1}*${show || 7} LIMIT ${show || 7}`)
        res.send(rows)
    } else {
        const { rows } = await pool.query('SELECT * FROM maps ORDER BY id DESC')
        res.send(rows)
    }
})

router.post('/peta', upload, async (req, res) => {
    try {
        if (Object.values(JSON.parse(req.body.json)).includes('')) {
            throw {error: 'gaoleh kosong lur'}
        }

        if (!req.file) {
            throw {error: 'upload gambar dulu gan'}
        }

        const { indexPeta, skala, tahun, penyusun, penerbit, a, b, c, d } = JSON.parse(req.body.json)
        const { filename } = req.file
        
        const row = await pool.query(`
            insert into
            maps(
                "lembar_peta", "skala", "tahun",
                "penyusun", "penerbit", "img_tif", "img",
                "a", "b", "c", "d"
            )
            values(
                '${indexPeta}', '${skala}', '${tahun}', 
                '${penyusun}', '${penerbit}', '12', '${filename}',
                '${a}', '${b}', '${c}', '${d}'
            )`
        )
        
        console.log(`Succesfully ${row.command.toLowerCase()} ${row.rowCount} row!`)
        res.send(`Succesfully ${row.command.toLowerCase()} ${row.rowCount} row!`)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

router.get('/peta/:id', async (req, res) => {
    const id = req.params.id
    const { rows } = await pool.query(`SELECT * FROM maps WHERE id=${id}`)
    res.send(rows)
})

router.put('/peta/:id', upload, async (req, res) => {
    try {
        if (Object.values(JSON.parse(req.body.json)).includes('')) {
            throw {error: 'gaoleh kosong lur'}
        }

        const { indexPeta, skala, tahun, penyusun, penerbit, a, b, c, d } = JSON.parse(req.body.json)
        const id = req.params.id
        
        if (!req.file) {
            const row = await pool.query(`
                UPDATE
                    maps
                SET
                    "lembar_peta" = '${indexPeta}',
                    "skala" = '${skala}',
                    "tahun" = '${tahun}',
                    "penyusun" = '${penyusun}',
                    "penerbit" = '${penerbit}',
                    "a" = '${a}',
                    "b" = '${b}',
                    "c" = '${c}',
                    "d" = '${d}'
                WHERE
                    id = ${id}`
            )
            console.log(`Successfully ${row.command.toLowerCase()} ${row.rowCount} row on ID: ${id}`)
            res.send(`Successfully ${row.command.toLowerCase()} ${row.rowCount} row on ID: ${id}`)  
        } else {
            const { filename } = req.file
            deleteImageExist(id)
            
            const row = await pool.query(`
                UPDATE
                    maps
                SET
                    "lembar_peta" = '${indexPeta}',
                    "skala" = '${skala}',
                    "tahun" = '${tahun}',
                    "penyusun" = '${penyusun}',
                    "penerbit" = '${penerbit}',
                    "img_tif" = 'TIF',
                    "img" = '${filename}',
                    "a" = '${a}',
                    "b" = '${b}',
                    "c" = '${c}',
                    "d" = '${d}'
                WHERE
                    id = ${id}`
            )

            console.log(`Successfully ${row.command.toLowerCase()} ${row.rowCount} row on ID: ${id}`)
            res.send(`Successfully ${row.command.toLowerCase()} ${row.rowCount} row on ID: ${id}`)
        }
    } catch (e) {
        console.log(e)
    }
})

router.delete('/peta/:id', async (req, res) => {
    const id = req.params.id
    deleteImageExist(id)
    const row = await pool.query(`DELETE FROM maps WHERE id=${id}`)
    console.log(`Successfully ${row.command.toLowerCase()} ${row.rowCount} row on ID: ${id}`)
    res.send(`Successfully ${row.command.toLowerCase()} ${row.rowCount} row on ID: ${id}`)
})

router.get('/peta/:id/photo', async (req, res) => {
    try {
        const { id } = req.params
        const { rows } = await pool.query(`SELECT img FROM maps WHERE id=${id}`)
        res.set('Content-Type', 'image/jpg')
        res.send(fs.readFileSync(path.resolve(__dirname, `../../public/img/${rows[0].img}`)))
    } catch(e) {
        res.send(e)
    }
})

router.get('/*', (req, res) => {
    res.send({ error: 'salah alamat lur' })
})

const deleteImageExist = async (id) => {
    const { rows } = await pool.query(`SELECT img FROM maps WHERE id=${id}`)
    const fileLocation = path.resolve(__dirname, `../../public/img/${rows[0].img}`)

    // cek file image ada atau tidak,
    // jika ada maka dihapus
    if (fs.existsSync(fileLocation)) {
        fs.unlinkSync(fileLocation)
    }
}

module.exports = router