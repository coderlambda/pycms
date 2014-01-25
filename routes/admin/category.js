/**
 * Created by cangya.jyt on 13-12-25.
 */
var Promise = require("promise");
var cm = require("./manager/CategoryManager");
var am = require("./manager/ArticleManager");

exports.list = function(req, res) {
    cm.list(req.db).done(function(list){
        res.render('admin/category/list.jade', {categories: list});
    });
}

exports.modify = function(req, res) {
    var db = req.db;
    var addCategory = req.param("addCategoryName");
    var idList = req.param("categoryId");
    //var visable = req.param("visable");
    var categoryList = req.param("categoryName");
    var id;

    if (addCategory && addCategory != "") {
        cm.add(db, {categoryName: addCategory});
    }
    console.log(req.body);
    while (id = idList.pop()){
        cm.update(db,{
            _id:id,
            categoryName: categoryList.pop()
        })
    }

    res.redirect('/admin/category/');
}

exports.categoryDetail = function(req, res) {
    var id = req.param("id");
    Promise.all([
            am.list(req.db, {categoryId:id}),
            cm.get(req.db, id)
        ]).done(function(data){
            res.render('admin/category/categoryDetail.jade', {articles: data[0], category: data[1]});
        });
}

exports.del = function(req, res) {
    var id = req.param("id");
    cm.del(req.db, id)
        .done(function(){
            res.redirect('/admin/category/');
        });
}

