require('dotenv').config();
const express = require('express');
var mongoose = require('mongoose');
const pug = require('pug');
const async = require('async');
const path = require('path');
const app = express()
const Item = require('./models/itemsSchema').Item;
const categories = require('./categories')

const items = require('./items').createItemsInstances
app.set('view engine', 'pug')
app.use(express.static(path.resolve(__dirname, '/views')))

const url = process.env.PASSWORD;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'))
categories()

app.get('/', function(req, res) {
    res.render('index')
})
app.listen(3000)