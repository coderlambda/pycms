
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var articleAdmin = require('./routes/admin/article');
var article = require('./routes/article');
var category = require('./routes/admin/category');
var subCategory = require('./routes/admin/subCategory');
var admin = require('./routes/admin');
var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var path = require('path');

//init database
var dbInit = new Promise(function(resolve, reject){
    MongoClient.connect("mongodb://115.28.172.124:27017/text", function(err, db) {
        db.collectionNames(function(err, collections){
            console.log(collections);
        });
        if (err){
            console.log(err);
            reject(err);
        } else {
            resolve(db);
        }
    });
});


var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(function(req, res, next){
    dbInit.done(function(db) {
        req.db = db;
        next();
    });
});
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/admin', admin.index);
app.get('/admin/article/', articleAdmin.list);
app.get('/admin/article/update', articleAdmin.modifyArticle);
app.get('/admin/article/edit', articleAdmin.modifyArticle);
app.post('/admin/article/update', articleAdmin.update);
app.get('/admin/article/del', articleAdmin.del);

app.get('/admin/category/', category.list);
app.get('/admin/category/detail', category.categoryDetail);
app.post('/admin/category/', category.modify);
app.get('/admin/category/del', category.del);

app.get('/admin/subCategory/', subCategory.list);
app.post('/admin/subCategory/', subCategory.modify);

app.get('/article', article.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});