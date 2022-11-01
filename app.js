const express = require('express');
const morgan = require('morgan');
const methodOveride = require('method-override')
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');

//Create the app
const app = express();

//Configure the app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//Mount the middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny')); 
app.use(methodOveride('_method'));

//Set up app routes
//NEED TO SETUP THE ROUTES

app.use((req, res, next)=> {
    let err = new Error("The server cannot locate " + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=> {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error")
    }
    res.status(err.status);
    res.render('error', {error: err});
});

//start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port ', port)
})