const mongoose = require('mongoose');
const { Schema } = mongoose;
const itemsSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    number_in_stock: Number
})
itemsSchema.virtual('url').get(function() {
    return `${this._id}`
})

const Item = mongoose.model('Item', itemsSchema)

module.exports = Item;