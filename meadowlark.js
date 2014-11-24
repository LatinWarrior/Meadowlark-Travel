/**
 * Created by luis_blanco on 11/19/2014.
 */

var express = require('express');
var fortune = require('./lib/fortune.js');
var bodyParser = require('body-parser');

var app = express();

var port = 4390;

app.set('port', process.env.PORT || port);

app.use(express.static(__dirname + '/public'));

// Set up handlebars view engine.
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(bodyParser());

// testing middleware
app.use(function(request, response, next){
    response.locals.showTests = app.get('end') !== 'production' && request.query.test === '1';
    next();
});

app.get('/tours/hood-river', function(request, response){
    response.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(request, response){
    response.render('tours/request-group-rate');
});

// routes
app.get('/', function (request, response) {
    response.render('home');
});

app.get('/about', function (request, response) {
    response.render('about', {fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js'});
});

app.post('/process', function(request, response){
    if (request.xhr || request.accepts('json,html')==='json'){
        // If there were an error, we should send { error: 'error description'}
        response.send({success: true});
    }
    else{
        // If there were an error, we would redirect to an error page.
        request.redirect(303, '/thank-you');
    }
});

// custom 404 page. Catch-all handler middleware.
app.use(function (request, response) {
    response.type('text/plain');
    response.status(400);
    response.send('404 - Not Found');
});

// custom 500 page.
app.use(function (error, request, response, next) {
    console.error(error.stack);
    response.type('text/plain');
    response.status(500);
    response.send('500 - Server Error');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:', app.get('port'));
});
