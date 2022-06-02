require('dotenv').config();
const express = require('express');
var mongoose = require('mongoose');
const pug = require('pug');
const async = require('async');
const path = require('path');
const app = express()

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })
const Item = require('./models/itemsSchema');
const item_routes = require('./routes/items')
const category_routes = require('./routes/categories')
console.log('test')
const bodyParser = require('body-parser');
const categories = require('./categories')
const items = require('./items')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))

var mongoDB = 'mongodb+srv://lyep:baByGrvi8fhUJmBM@cluster0.ibexa.mongodb.net/inventoryApp?retryWrites=true&w=majority';

const url = process.env.MONGODB_URI || mongoDB;
// 6290140b90bc379e228a127c
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'))



categories()
items()


app.use((req, res, next) => {
    global.password = 'secret';
    next()
})

app.get('/', (req, res) => {
    res.send("Hello")
})
app.get('/login', async(req, res) => {
    res.render('login')
})




app.post('/login', (req, res, next) => {
    if (req.body.password === global.password) {
        global.user = 'signed in'
    } else {
        global.user = 'not signed in'
    }
    console.log('var', global.user)
    res.redirect('/categories')


})

app.use('/items', item_routes)
app.use('/categories', category_routes)

app.listen(process.env.PORT || 3000)