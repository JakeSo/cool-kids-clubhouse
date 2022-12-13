const express = require('express');
const morgan = require('morgan');
var path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const methodOveride = require('method-override')
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');

//Create the app
const app = express();

//Configure the app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//connect to database
mongoose.connect("mongodb://localhost:27017/coolkidsclub",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //start app
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

//Mount the middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoeft",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: "mongodb://localhost:27017/coolkidsclub" }),
        cookie: { maxAge: 60 * 60 * 1000 }
    })
);
app.use(flash());

app.use((req, res, next) => {
    // console.log(req.session);
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOveride('_method'));

//Set up app routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/client', clientRoutes);

app.use('/admin', adminRoutes);

//is necessary for parsing POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    let err = new Error("The server cannot locate " + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error")
    }
    res.status(err.status);
    res.render('error', { error: err });
});