const express = require('express');
const router = express.Router()
const Item = require('../models/itemsSchema');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
    // const upload = multer({ dest: 'uploads/' })

router.get('/', async(req, res) => {
    const found_items = await Item.find({})
    res.render('items', { found_items })
})


router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const found_item = await Item.findById(id)

    res.render('items_detail', { item: found_item })
})


router.post('/:id', upload.single('uploaded_file'), async(req, res) => {
    console.log(req.body, req.file)

    let found_item = await Item.findById(req.params.id);
    console.log(found_item)

    // let path1 = `/Users/lucas/Inventory-Application/${req.file.path}`
    // console.log('p1', path1)
    found_item.img = `/${req.file.filename}`;
    found_item.save().then((result) => {
        console.log(result.img, 'image')
        res.redirect(`/items/${req.params.id}`)
    })
})


module.exports = router