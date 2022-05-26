const Item = require('./models/itemsSchema').Item;

const createItems = (name, description, price, number_in_stock) => {
    return { name, description, price, number_in_stock }
}

const createItemsInstances = async() => {

    const items = [{
            Item: 'Leash',
            Description: 'Walk dogs',
            Price: 10,
            Number_in_Stock: 300
        },

        {
            Item: 'Walking stick',
            Description: 'Use for hiking',
            Price: 25,
            Number_in_Stock: 200
        },


        {
            Item: 'Food Thermometer',
            Description: 'Used for checking meat is ready',
            Price: 30,
            Number_in_Stock: 500
        },

        {
            Item: 'Pencil',
            Description: 'Used for writing and drawing',
            Price: 5,
            Number_in_Stock: 1000
        },
        {
            Item: 'Pen',
            Description: 'Used for writing',
            Price: 7,
            Number_in_Stock: 1000
        }, { Item: 'The Legend of Zelda', Description: 'A classic video game', Price: 30, Number_in_Stock: 400 },

        { Item: 'Spiderman 2', Description: 'Sam Raimi directed movie', Price: 20, Number_in_Stock: 200 },

        { Item: 'Red Chair', Description: 'A red chair that is really big', Price: 30, Number_in_Stock: 300 }
    ]
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        for (var key in item) {
            new_item = new Item({ name: Item, description: Description, price: Price, number_in_stock: Number_in_Stock })
            await new_item.save();
        }

    }
}


module.exports = createItemsInstances;