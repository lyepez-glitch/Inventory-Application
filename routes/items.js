const express = require('express');
const router = express.Router()
const Item = require('../models/itemsSchema');

router.get('/', async(req, res) => {
    const found_items = await Item.find({})
    res.render('items', { found_items })
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const found_item = await Item.findById(id)

    res.render('items_detail', { item: found_item })

})
module.exports = router