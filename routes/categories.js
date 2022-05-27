const express = require('express');
const router = express.Router()
const Category = require('../models/categorySchema');
const Item = require('../models/itemsSchema');
router.get('/', async(req, res) => {
    const found_categories = await Category.find({}).populate('items')
    res.render('categories', { found_categories })
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    Category.findById(id).populate('items').then(cat => {
        console.log('test', cat)
        res.render('category_detail', { cat })
    })




})

module.exports = router