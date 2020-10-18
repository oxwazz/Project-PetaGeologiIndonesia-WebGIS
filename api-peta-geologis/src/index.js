const express = require('express')
const cors = require('cors')
const routerPeta = require('./routers/routerPeta')

const app = express()

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.use(routerPeta)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})