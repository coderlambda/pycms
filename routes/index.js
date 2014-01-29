
/*
 * GET home page.
 */

var Promise = require("promise");
var am = require("./admin/manager/ArticleManager");
var cm = require("./admin/manager/CategoryManager");
var _ = require("lodash");



exports.index = function(req, res){
    cm.list(req.db, {}).done(function(categoryList){
        res.render('index', { categories: categoryList});
    });

};