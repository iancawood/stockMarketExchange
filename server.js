var express = require('express');
var logger = require('./logger');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(logger);
app.use(bodyParser.json());

mongoose.connect('mongodb://master:master@ds063870.mongolab.com:63870/se3314');
// schemas
var Schema = mongoose.Schema;
var company = new Schema({
    name: String,
    symbolURL: String,
    openPrice: Number,
    currentPrice: {type: Number, default: 0},
    changeValue: {type: Number, default: 0},
    changeIcon: {type: Number, default: 'images/noChange.png'},
    changePercentage: {type: Number, default: 0},
    changeDirection: {type: Number, default: 0},// 1- up, 2- down, 0- noChange. Used for sorting
    shareVolume: {type: Number, default: 0},
    buyOrders: [{type: ObjectId, ref: 'buyOrder'}],
    saleOrders: [{type: ObjectId, ref: 'saleOrder'}],
    transactions: [{type: ObjectId, ref: 'transaction'}]
});
var buyOrder = new Schema({
    timeStamp: Number,
    size: Number,
    price: Number,
    company: {type: ObjectId, ref: 'company'}
});
var saleOrder = new Schema({
    timeStamp: Number,
    size: Number,
    price: Number,
    company: {type: ObjectId, ref: 'company'}
});
var transaction = new Schema({
    timeStamp: Number,
    size: Number,
    price: Number,
    company: {type: ObjectId, ref: 'company'}
});

// models
var companies = mongoose.model("companies", company);
var buyOrders = mongoose.model("buyOrders", buyOrder);
var saleOrders = mongoose.model("saleOrders", saleOrder);
var transactions = mongoose.model("transactions", transaction);

app.listen(3000, function(){
    console.log('Listening on port 3000');
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

// get all the companies
app.get('/companies', function(request, response) {
    console.log("in get companies");
});

// get all the buy orders
app.get('/buyOrders', function(request, response) {
    console.log("in get buy orders");
});

// get all the sell orders
app.get('/saleOrders', function(request, response) {
    console.log("in get sale orders");
});

// create a company
app.post('/companies', function(request, response) {
    console.log("in post companies");
});

// create a buy order
app.post('/buyOrders', function(request, response) {
    console.log("in post buy orders");
});

// create a sale order
app.post('/saleOrders', function(request, response) {
    console.log("in post sale orders");
});

// create a transaction
app.post('/transactions', function(request, response) {
    console.log("in post transactions");
});

// update a company with new info
app.put('/companies/:company_id', function(request, response) {
    console.log("in put company for ");
});

// delete a buy order
app.delete('/buyOrders/:buyOrder_id', function(request, response) {
    console.log("in delete buy order for ");
});

// delete a sale order
app.delete('/buyOrders/:saleOrder_id', function(request, response) {
    console.log("in delete sale order for ");
});

//var data = [ ];
//app.get('/posts/:post_id', function (request, response) {
//    var post = data.filter(function (post) {
//        return post.id == request.params.post_id;
//    });
//    response.json({posts: post});
//});
//
//var data = [ ];
//app.get('/posts/:post_id', function (request, response) {
//    var post = data.filter(function (post) {
//        return post.id == request.params.post_id;
//    });
//    if (!post) {
//        response.status(404).json('No post found with ID = ' +
//        request.params.post_id);
//    } else {
//        response.json({posts: post});
//    }
//});
//
//
//app.post('/posts', function (request, response) {
//    key++;
//    var newPost = {
//        id: key,
//        title: request.body.post.TITLE,
//        body: request.body.post.BODY
//    };
//    data.push(newPost);
//    response.status(201).json({posts: newPost});
//});
//
//app.delete('/posts/:post_id', function (request, response) {
//    var post = data.filter(function (post) {
//        return post.id != request.params.post_id;
//    });
//    data = post;
//    response.sendStatus(200);
//});

// error handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});