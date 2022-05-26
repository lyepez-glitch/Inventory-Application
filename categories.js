const Category = require('./models/categorySchema');



const createCategoriesInstances = async() => {
    await Category.deleteMany({})

    let categories = [
        { Name: 'Bathroom', Description: 'Used for bathroom hygiene' },
        { Name: 'Office', Description: 'Used in the office' },
        { Name: 'Sports', Description: 'Used in sports' },
        { Name: 'Hiking', Description: 'Used for hiking' },
        { Name: 'Dogs', Description: 'Used for dogs' },
        { Name: 'Food', Description: 'eat' },
        { Name: 'Video games', Description: 'play games' },
        { Name: 'Movies', Description: 'related to movies' }, { Name: 'Drinks', Description: 'related to drinks' },
        { Name: 'Cars', Description: 'related to cars' },
        { Name: 'Clothes', Description: 'something you can wear' }, { Name: 'Furniture', Description: 'Something to lay or sit on' }
    ]
    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        var new_category = new Category({ name: category.Name, description: category.Description })
        await new_category.save();

    }

}


module.exports = createCategoriesInstances;