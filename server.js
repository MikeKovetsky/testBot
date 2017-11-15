var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/testBotModel'), //created model loading here
    bodyParser = require('body-parser');
log = require('./api/libs/log')(module);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://localhost/testBot');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//     res.status(404);
//     log.debug('Not found URL: %s', req.url);
//     res.send({error: 'Not found'});
//     return;
// });
//
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     log.error('Internal error(%d): %s', res.statusCode, err.message);
//     res.send({error: err.message});
//     return;
// });

app.get('/ErrorExample', function (req, res, next) {
    next(new Error('Random error!'));
});

var routes = require('./api/routes/testBotRoutes'); //importing route
routes(app); //register the route

app.listen(port);
