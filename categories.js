const Category = require('./models/categorySchema');
const Item = require('./models/itemsSchema');
var catArr = [{ name: 'Home', items: ['House'] }, { name: 'Food', items: ['Pizza'] }, { name: 'Bathroom', items: 'Tub' }, { name: 'Games', items: ['Legend of Zelda'] }, { name: 'Movies', items: ['Spiderman 2'], }, { name: 'Computers', items: ['Mac'] }, { name: 'Music', items: ['Linkin Park'] }, { name: 'Pets', items: ['Dog'] }];
var getReference = (name) => {
    for (var i = 0; i < catArr.length; i++) {
        let arrItem = catArr[i];
        if (arrItem.name === name) {
            return arrItem.items[0]
        }
    }
}


const createCategoriesInstances = async() => {
    await Category.deleteMany({})
    for (var i = 0; i < catArr.length; i++) {
        var cat = catArr[i].name;
        let found_Item = await Item.findOne({ name: getReference(cat) })
            // console.log(found_Item, 'found')
        var new_cat = new Category({ name: catArr[i].name, description: catArr[i].description, items: [] })
        await new_cat.save()
        new_cat.items.push(found_Item)
        new_cat = await new_cat.save()
            // console.log(new_cat)
    }





    // var new_category = new Category({
    //     name: 'Bathroom',
    //     description: 'Used for bathroom hygiene',
    //     items: []
    // })
    // saved_category = await new_category.save();
    // const item = await Item.findOne({ name: 'Leash' })
    // new_category.items.push(item)
    // await new_category.save()
    // console.log(new_category)
}


module.exports = createCategoriesInstances;