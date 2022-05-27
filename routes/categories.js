const express = require('express');
const router = express.Router()
const Category = require('../models/categorySchema');
const Item = require('../models/itemsSchema');
router.get('/', async(req, res) => {
    const found_categories = await Category.find({}).populate('items')
    res.render('categories', { found_categories, create: `/categories/create` })
})

router.get('/create', async(req, res) => {
    res.render('create_form')
})

router.post('/create', async(req, res) => {
    const { category, description } = req.body;
    const new_category = new Category({ name: category, description })
    await new_category.save()
    console.log('Category Created')
    res.redirect('/categories')

})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    Category.findById(id).populate('items').then(cat => {
        console.log('test', cat)
        res.render('category_detail', { cat, items: cat.items })
    })
})








module.exports = router