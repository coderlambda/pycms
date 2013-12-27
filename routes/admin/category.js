/**
 * Created by cangya.jyt on 13-12-25.
 */

var cm = require("./manager/CategoryManager");

exports.list = function(req, res) {
    cm.list(req.db).done(function(list){
        res.render('admin/category/list.jade', {categories: list});
    });
}

exports.modifyArticle = function(req, res) {
    var db = req.db;
    var getSCList = scm.list(db);

    getSCList.done(function(sc){
        var id = req.param("aid");
        if (id && id != ""){
            am.get(db, id).done(function(a) {
                res.render('admin/article/modifyArticle', {article: a, subCategories: sc});
            });
        } else {
            res.render('admin/article/modifyArticle', {article: {}, subCategories: sc});
        }
    });
}

exports.add = function(req, res) {
    am.add(req.db, req.body)
        .done(function(result){
            res.redirect('../');
        });
}