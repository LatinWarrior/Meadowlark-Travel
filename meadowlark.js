/**
 * Created by luis_blanco on 11/19/2014.
 */

var express = require('express');

var app = express();

var port = 4390;

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.set('port', process.env.PORT || port);

app.use(express.static(__dirname + '/public'));

// Set up handlebars view engine.
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// routes
app.get('/', function (request, response) {
    //response.type('text/plain');
    //response.send('Meadowlark Travel');
    response.render('home');
});

app.get('/about', function (request, response) {
    //response.type('text/plain');
    //response.send('Meadowlark Travel About');
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    response.render('about', {fortune: randomFortune});
});

// custom 404 page. catch-all handler middleware.
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
