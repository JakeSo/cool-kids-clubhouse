const express = require('express');
const morgan = require('morgan');
var path = require('path');
var bodyParser = require("body-parser");
const methodOveride = require('method-override')
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
//Connect to the mongoDB
var db = require('mongoskin').db("mongodb://localhost:27017/coolkidsclub", { w: 0});
    db.bind('events');

//Create the app
const app = express();

//Configure the app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//Mount the middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny')); 
app.use(methodOveride('_method'));

//Set up app routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use('/client', clientRoutes);

app.use('/admin', adminRoutes);

//is necessary for parsing POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port ', port)
});