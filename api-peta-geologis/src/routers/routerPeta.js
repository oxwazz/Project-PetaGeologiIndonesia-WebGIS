const path = require('path')
const fs = require('fs')
const express = require('express')
const connection = require('../db/mysql2')
const upload = require('../middleware/upload')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/peta', async (req, res) => {
    try {
        const page = req.query.page
        const show = req.query.show
    
        if (page <= 0) {
            res.send({ error: "halaman tidak ditemukan lur" })
        } else if (page) {
            const [rows] = await connection.promise().query(`SELECT * FROM maps ORDER BY id DESC LIMIT ${ show || 7 } OFFSET ${ (page-1)*(show || 7)}` )
            res.send(rows)
        } else {
            const [rows] = await connection.promise().query('SELECT * FROM maps ORDER BY id DESC')
            res.send(rows)
        }
    } catch (e) {
        res.send(e)
    }
})

router.post('/peta', auth, upload, async (req, res) => {
    try {
        const json = JSON.parse(req.body.json)

        if (Object.values(json).includes('')) {
            throw { error: 'gaoleh kosong lur' }
        }

        if (!req.file) {
            throw { error: 'upload gambar dulu gan' }
        }

        const { lembar_peta, skala, tahun, penyusun, penerbit, a, b, c, d } = json
        const { filename } = req.file
        
        const row = await connection.promise().query(`
            insert into
            maps(
                lembar_peta, skala, tahun,
                penyusun, penerbit, img_tif, img,
                a, b, c, d
            )
            values(
                '${lembar_peta}', '${skala}', '${tahun}', 
                '${penyusun}', '${penerbit}', '12', '${filename}',
                '${a}', '${b}', '${c}', '${d}'
            )`
        )
        
        console.log(`Succesfully INSERT ${row[0].affectedRows} row!`)
        res.send(`Succesfully INSERT ${row[0].affectedRows} row!`)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

router.get('/peta/:id', async (req, res) => {
    const id = req.params.id
    const [rows] = await connection.promise().query(`SELECT * FROM maps WHERE id=${id}`)
    res.send(rows)
})

router.put('/peta/:id', auth, upload, async (req, res) => {
    const json = JSON.parse(req.body.json)

    try {
        if (Object.values(json).includes('')) {
            throw { error: 'gaoleh kosong lur' }
        }
        
        const { lembar_peta, skala, tahun, penyusun, penerbit, a, b, c, d } = json
        const id = req.params.id
        
        if (!req.file) {
            const row = await connection.promise().query(`
            UPDATE
            maps
            SET
            lembar_peta = '${lembar_peta}',
            skala = '${skala}',
            tahun = '${tahun}',
            penyusun = '${penyusun}',
            penerbit = '${penerbit}',
            a = '${a}',
            b = '${b}',
            c = '${c}',
            d = '${d}'
            WHERE
            id = ${id}`
            )
            
            res.send(`Successfully UPDATE ${row[0].affectedRows} row on ID: ${id}`)  
        } else {
            const { filename } = req.file
            deleteImageExist(id)
            
            const row = await connection.promise().query(`
                UPDATE
                    maps
                SET
                    lembar_peta = '${lembar_peta}',
                    skala = '${skala}',
                    tahun = '${tahun}',
                    penyusun = '${penyusun}',
                    penerbit = '${penerbit}',
                    img_tif = 'TIF',
                    img = '${filename}',
                    a = '${a}',
                    b = '${b}',
                    c = '${c}',
                    d = '${d}'
                WHERE
                    id = ${id}`
            )

            res.send(`Successfully UPDATE ${row[0].affectedRows} row on ID: ${id}`)  
        }
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

router.delete('/peta/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        deleteImageExist(id)
        const row = await connection.promise().query(`DELETE FROM maps WHERE id=${id}`)
        res.send(`Successfully DELETE ${ row[0].affectedRows } row on ID: ${id}`)
    } catch (e) {
        res.send(e)
    }

})

router.get('/peta/:id/photo', async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await connection.promise().query(`SELECT img FROM maps WHERE id=${id}`)
        res.set('Content-Type', 'image/jpg')
        res.send(fs.readFileSync(path.resolve(__dirname, `../../public/img/${ rows[0].img }`)))
    } catch(e) {
        res.send(e)
    }
})

// fungsi hapus gambar yang sudah ada
const deleteImageExist = async (id) => {
    const [rows] = await connection.promise().query(`SELECT img FROM maps WHERE id=${id}`)
    const fileLocation = path.resolve(__dirname, `../../public/img/${rows[0].img}`)

    if (fs.existsSync(fileLocation)) {
        fs.unlinkSync(fileLocation)
    }
}

module.exports = router