const path = require('path')
const multer = require('multer')

const imageFolder = path.resolve(__dirname, '../../public/img')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageFolder)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

let upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (Object.values(JSON.parse(req.body.json)).includes('')) {
            return cb(null, false)
        }
        cb(null, true)
    }
}).single('image')

module.exports = upload