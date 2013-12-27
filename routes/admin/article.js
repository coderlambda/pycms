var am = require("./manager/ArticleManager");
var scm = require("./manager/SubCategoryManager");

exports.list = function(req, res) {
    am.list(req.db).done(function(list){
        res.render('admin/article/list.jade', {articles: list});
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