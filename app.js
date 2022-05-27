require('dotenv').config();
const express = require('express');
var mongoose = require('mongoose');
const pug = require('pug');
const async = require('async');
const path = require('path');
const app = express()
const Item = require('./models/itemsSchema');
const item_routes = require('./routes/items')
const category_routes = require('./routes/categories')
const categories = require('./categories')
const items = require('./items')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


const url = process.env.PASSWORD;
// 6290140b90bc379e228a127c
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'))



categories()
items()

app.use('/items', item_routes)
app.use('/categories', category_routes)

app.listen(3000)