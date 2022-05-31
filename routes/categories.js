const express = require('express');
const router = express.Router()

const Category = require('../models/categorySchema');
const mongoose = require('mongoose')
const Item = require('../models/itemsSchema');
router.get('/', async(req, res) => {
    const found_categories = await Category.find({}).populate('items')
        // console.log('test the cats', found_categories)
    res.render('categories', { found_categories, create: `/categories/create` })
})

router.get('/create', async(req, res) => {
    res.render('create_form')
})



router.get('/:id', async(req, res) => {
    const { id } = req.params;
    Category.findById(id).populate('items').then(cat => {

        res.render('category_detail', { cat, items: cat.items, itemURL: `${req.params.id}/AddItems`, catID: id })
    })
})

router.post('/create', async(req, res) => {
    let { category, description, items, uploaded_file } = req.body;
    let itemsArr = items.split(',')
    console.log(req.body, 'file');
    const new_category = new Category({ name: category, description, items: [] })

    itemsArr.forEach(async(item) => {

        let new_item = new Item({ name: item });
        new_item.save().then(async(result) => {
            new_category.items.push(new_item)
        })

    })


    new_category.save().then(result => {

        result.save().then((result) => {
            // res.redirect('/categories')
        })

    })


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
        // console.log('item', item)
        let new_item = new Item({
            name: item
        });
        found_cat.items.push(new_item)
        let saved_item = await new_item.save();



    })
    found_cat = await found_cat.save()
        // console.log('fcat', found_cat)
    res.redirect('/categories')


})



router.get('/delete/:cat', (req, res) => {
    const { cat } = req.params;
    res.render('deleteCatForm', { catID: cat })
})

router.post('/delete/:cat', (req, res) => {
    const { cat } = req.params;
    Category.findById(cat).then(async(result) => {
        const { name } = result;
        await Category.deleteOne(result);
        // res.send(`${name} deleted`)
        res.redirect('/categories')
    })
})

router.get('/updatecat/:cat', async(req, res) => {
    const { cat } = req.params;
    let itemsStr = '';
    let found_cat = await Category.findById(cat).populate('items');
    found_cat.items.forEach(item => {
        itemsStr += item.name += ', '
    })



    res.render('updateCat', { cat: found_cat, items: itemsStr, catID: found_cat._id }, )
})


router.post('/updatecat/:cat', async(req, res) => {
    let { cat } = req.params;
    let { items } = req.body;
    items = items.split(',')
        // console.log(cat, 'orig id')
    let { category, description } = req.body;
    let found_cat = await Category.findById(cat);
    found_cat.name = category;
    found_cat.description = description;
    items.forEach(item => {
        console.log('test item', item)
        Item.find({ name: item }).then(async(result) => {
            console.log('result', result)
            if (result.length < 1) {
                let new_item = new Item({ name: item })
                found_cat.items.push(new_item)
                let saved_item = await new_item.save();



            }
        })
    })
    await found_cat.save();
    found_cat.save().then((result) => {
        console.log('result', result)
        res.redirect(`/categories/${cat}`)
    })



    // let found_cat = await Category.findById(req.params.id)
    // items = items.split(',');
    // items.forEach(async(item) => {
    //     // console.log('item', item)
    //     let new_item = new Item({
    //         name: item
    //     });
    //     found_cat.items.push(new_item)
    //     let saved_item = await new_item.save();



    // })
    // found_cat = await found_cat.save()
    //     // console.log('fcat', found_cat)
    // res.redirect('/categories')

})

router.get('/delete/:item/:cat', (req, res) => {
    const { item, cat } = req.params;
    res.render('deleteForm', { itemID: item, catID: cat })
})

router.post('/delete/:item/:cat', async(req, res) => {
    const { item, cat } = req.params;

    let found_cat = await Category.findById(cat).populate('items');
    // console.log(found_cat, 'cat before delete')
    let found_item = await Item.findById(item);
    found_cat.items.forEach(old_item => {
        if (JSON.stringify(old_item._id), item) {
            found_cat.items = found_cat.items.filter(item => {
                item._id !== old_item._id
            })



        }
    })
    found_cat = await found_cat.save();
    // console.log(found_cat, 'cat after delete')
    res.send(`Item ${found_item.name} deleted`)


})











module.exports = router