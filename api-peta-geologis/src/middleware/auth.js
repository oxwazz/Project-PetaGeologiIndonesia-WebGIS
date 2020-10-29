const jwt = require('jsonwebtoken')
const connection = require('../db/mysql2')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = await jwt.verify(token, 'SECRET_KEYZ')
        const [row] = await connection.promise().query(`
            SELECT *
            FROM admin
            WHERE username='${decode.username}' AND token='${token}'
        `)

        if (!row.length){
            throw { error: 'Harus login dulu' }
        }

        req.username = decode.username

        next()
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

module.exports = auth