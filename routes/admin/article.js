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
                res.render('admin/article/modifyArticle', {article: a});
            });
        } else {
            var cid = req.param("cid");
            res.render('admin/article/modifyArticle', {article: {categoryId: cid}});
        }
    });
}

exports.update = function(req, res) {
    var id = req.param("_id");
    if (id && id != "") {
        am.update(req.db, req.body)
            .done(function(result){
                res.redirect('/admin/category/detail?id=' + req.body.categoryId);
            });
    } else {
        am.add(req.db, req.body)
            .done(function(result){
                res.redirect('/admin/category/detail?id=' + req.body.categoryId);
            });
    }

}

exports.del = function(req, res) {
    var aid = req.param("aid"),
        categoryId = req.param("cid");
    if (aid && aid != "") {
        am.del(req.db, aid)
            .done(function(result){
                res.redirect('/admin/category/detail?id=' + categoryId);
            })
    }
}