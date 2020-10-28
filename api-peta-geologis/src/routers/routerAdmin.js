const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const connection = require('../db/mysql2')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { username, password, konfirmasiPassword } = req.body

        // username minimal 8 karakter
        if (username.length < 8) {
            throw { error: 'Username minimal 8 karakter' }
        }
    
        // password minimal 8 karakter
        if (password.length < 8) {
            throw { error: 'Password minimal 8 karakter' }
        }
    
        // password harus sama
        if (password !== konfirmasiPassword) {
            throw { error: 'Password tidak sama' }
        }

        const [rows] = await connection.promise().query(`
            SELECT username
            FROM admin
            WHERE username='${username}'
        `)

        // username tidak boleh sama 
        if (rows.length) {
            throw { error: 'username sudah dipakai' }
        }

        const passwordHash = await bcrypt.hash(password, 8)
        await connection.promise().query(`
            INSERT INTO admin(username, password) 
            VALUES ('${username}', '${passwordHash}')
        `)

        res.send(`Successfully Resgister`)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const [row] = await connection.promise().query(`
            SELECT * FROM admin WHERE username='${username}'
        `)

        // user harus ada di database
        if (!row.length) {
            throw { error: 'User tidak ada' }
        }

        // password harus benar
        const isMatch = await bcrypt.compare(password, row[0].password)
        if (!isMatch) {
            throw { error: 'Password salah' }
        }

        // send token user to database
        const token = await jwt.sign({ username }, 'SECRET_KEYZ')
        await connection.promise().query(`
            UPDATE admin
            SET token='${token}'
            WHERE username='${username}'
        `)

        res.send({ username, token })
    } catch (e) {
        res.send(e)
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        await connection.promise().query(`
            UPDATE admin
            SET token=null
            WHERE username='${req.username}'
        `)
        console.log(req.username)
        res.send(`Successfully LOGOUT username: ${req.username}`)
    } catch (e) {
        res.send(e)
    }
})

router.get('/tes', auth, async (req, res) => {
    res.send('router admin')
})

module.exports = router