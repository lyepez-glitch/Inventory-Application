const express = require('express');
const router = express.Router()
const Category = require('../models/categorySchema');
const mongoose = require('mongoose')
const Item = require('../models/itemsSchema');
router.get('/', async(req, res) => {
    const found_categories = await Category.find({}).populate('items')
    res.render('categories', { found_categories, create: `/categories/create` })
})

router.get('/create', async(req, res) => {
    res.render('create_form')
})

router.post('/create', async(req, res) => {
    let { category, description, items } = req.body;
    items = items.split(',')
    var itemsCopy = items;
    const new_category = new Category({ name: category, description, items: [] })

    await new_category.save()

    console.log(new_category)

    console.log('Category Created')
    res.redirect('/categories')

})

router.get('/:id/addItems', async(req, res) => {
    let cat_name = await Category.findById(req.params.id);
    const { name } = cat_name;
    res.render('add_items', { cat_name: name })
})

router.post('/:id/addItems', async(req, res) => {
    let { cat, items } = req.body;
    let found_cat = await Category.findById(req.params.id)
    items = items.split(',');
    items.forEach(async(item) => {
        console.log('item', item)
        let new_item = new Item({
            name: item
        });
        found_cat.items.push(new_item)
        let saved_item = await new_item.save();



    })
    found_cat = await found_cat.save()
    console.log('fcat', found_cat)
    res.redirect('/categories')


})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    Category.findById(id).populate('items').then(cat => {
        console.log('test', cat, cat.items)
        res.render('category_detail', { cat, items: cat.items, itemURL: `${req.params.id}/AddItems` })
    })
})








module.exports = router