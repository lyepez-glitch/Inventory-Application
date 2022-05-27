const mongoose = require('mongoose');
const { Schema } = mongoose;
const categorySchema = new Schema({
    name: String,
    description: String,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]

})
categorySchema.virtual('url').get(function() {
    return `/categories/${this._id}`
})

const Category = mongoose.model('Category', categorySchema);



module.exports = Category;