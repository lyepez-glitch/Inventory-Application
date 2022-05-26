const mongoose = require('mongoose');
const { Schema } = mongoose;
const itemsSchema = new Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    number_in_stock: Number,
    url: String
})

const Item = mongoose.model('Item', itemsSchema)

module.exports = Item;