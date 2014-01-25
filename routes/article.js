var Promise = require("promise");
var am = require("./admin/manager/ArticleManager");
var cm = require("./admin/manager/CategoryManager");


exports.show = function(req, res) {
    var id = req.param("id");

    am.get(req.db, id).done(function(article) {
        cm.get(req.db, article.categoryId).done(function(category){
            console.log(article);
            console.log(category);
            res.render('article/tabedArticle', {
                article: article,
                category: category
            });
        });
    });
}