const mysql = require('mysql2')
const bluebird = require('bluebird');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'webgis_aldi',
})

module.exports = connection