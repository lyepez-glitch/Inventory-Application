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

router.get('/addimage/:id', async(req, res) => {
    const found_item = await Item.findById(req.params.id)
    console.log(found_item.url)
    res.render('addimage', { newImg: true, item: found_item })
})

router.post('/addimage/:id', async(req, res) => {

})





router.get('/edit-items/:id', async(req, res) => {
    const { id } = req.params;
    const found_item = await Item.findById(id)
    res.render('item_edit', { item: found_item })
})
router.post('/edit-items/:id', async(req, res) => {
    const { id } = req.params;
    const { uploaded_file, item, description } = req.body;
    const found_item = await Item.findById(id);
    found_item.name = item;
    found_item.description = description;
    found_item.img = `/${uploaded_file}`;
    found_item.save().then((result) => {
        res.redirect(`/items/${req.params.id}`)
    })
})






router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const found_item = await Item.findById(id)

    res.render('items_detail', { item: found_item })
})


router.post('/:id', upload.array('uploaded_file', 5), async(req, res) => {

    console.log('body', req.body)

    let found_item = await Item.findById(req.params.id);
    console.log(found_item)

    // let path1 = `/Users/lucas/Inventory-Application/${req.file.path}`
    // console.log('p1', path1)
    found_item.name = req.body.name;
    found_item.description = req.body.description;
    // found_item.img = `/${req.body.uploaded_file[0]}`;
    found_item.img = req.body.uploaded_file;
    found_item.save().then((result) => {
        console.log(result, 'image')
        result.save().then((result) => {
            res.redirect(`/items/${req.params.id}`)
        })

    })
})


module.exports = router