const Item = require('./models/itemsSchema');


const mongoose = require('mongoose');
var catArr = [{ name: 'Home', items: ['House'] }, { name: 'Food', items: ['Pizza'] }, { name: 'Bathroom', items: 'Tub' }, { name: 'Games', items: ['Legend of Zelda'] }, { name: 'Movies', items: ['Spiderman 2'], }, { name: 'Computers', items: ['Mac'] }, { name: 'Music', items: ['Linkin Park'] }, { name: 'Pets', items: ['Dog'] }];

var itemsArr = [{ name: 'House', description: 'People live in it' }, { name: 'Pizza', description: 'it is cheesy and good' }, { name: 'Tub', description: 'take baths' }, { name: 'Legend of Zelda', description: 'Best game for nintendo' }, { name: 'Spiderman 2', description: 'OG spiderman movie' }, { name: 'Mac', description: 'A type of computer' }, { name: 'Linkin Park', description: 'a good numetal band' }, { name: 'Dog', description: 'Man\'s best friend' }]

var getReference = (item) => {
    for (var i = 0; i < catArr.length; i++) {
        let arrItem = catArr[i];
        if (arrItem.items.includes(item)) {
            return arrItem.name
        }
    }
}


const createItemsInstances = async() => {
    await Item.deleteMany({})
    for (var i = 0; i < itemsArr.length; i++) {
        var item = itemsArr[i];
        var new_item = new Item({
            name: item.name,
            description: item.description,
            price: item.price,
            number_in_stock: item.number_in_stock
        })
        new_item = await new_item.save();

    }



}



module.exports = createItemsInstances;