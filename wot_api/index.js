"use strict";

var config = require('./config');
var Controller = require('./controller');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var whitelist = [config.domain];

// App Config Set
app.disable('etag');
app.disable('views');
app.disable('view cache');
app.disable('view engine');
app.disable('x-powered-by');
app.enable('trust proxy'); // reverse proxy must trust nginx
app.use(bodyParser.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '1kb'})); // for parsing application/json
app.use(function(req, res, next) {
    var origin = req.header('Origin');
    if(whitelist.indexOf(origin) !== -1) {
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", config.domain);
        res.header("Access-Control-Allow-Methods", "POST,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Max-Age", 86400);
        next();
    } else {
        if(req.path === '/api/v1/health-check') {
            next();
        } else {
            next('Not Allowed');
        }
    }
});

// Routes: V1
var routerV1 = express.Router();
routerV1.get(Controller.routes.HEALTH_CHECK, Controller.healthCheck);
routerV1.post(Controller.routes.HASH, Controller.hashSeries);
routerV1.post(Controller.routes.BASE, Controller.baseSeries);
routerV1.post(Controller.routes.CRON, Controller.cronSeries);
routerV1.post(Controller.routes.URL, Controller.urlSeries);
// routerV1.post(Controller.routes.SLUG, Controller.slug);
// routerV1.route('/random')
//     .post(Controller.routes.RANDOM.INTEGER, Controller.randomInteger)
//     .post(Controller.routes.RANDOM.FLOAT, Controller.randomFloat)
//     .post(Controller.routes.RANDOM.STRING, Controller.randomString)
//     .post(Controller.routes.RANDOM.HASH, Controller.randomHash)
//     .post(Controller.routes.RANDOM.PASSWORD, Controller.randomPassword)
// ;
app.use('/api/v1', routerV1);

app.use(function(err, req, res, next){
    // console.error(req, err);
    console.error(err);
    res.status(500).json({'code':500}).end();
});
app.use(function(req, res){
    res.status(404).json({'code':404}).end();
});

app.listen(config.port, config.host,function () {
    console.log('Wot Api started ' + config.host + ':' + config.port + ' with ' + config.env);
});