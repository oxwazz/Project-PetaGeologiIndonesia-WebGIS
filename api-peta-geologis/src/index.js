const express = require('express')
const cors = require('cors')
const routerPeta = require('./routers/routerPeta')
const routerAdmin = require('./routers/routerAdmin')

const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.use(routerPeta)
app.use(routerAdmin)

// endpoint untuk halaman yang tidak tersedia
app.get('/*', (req, res) => {
    res.send({ error: 'salah alamat lur' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})