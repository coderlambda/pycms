var Promise = require("promise");
var am = require("./admin/manager/ArticleManager");
var cm = require("./admin/manager/CategoryManager");
var _ = require("lodash");


exports.show = function(req, res) {
    var id = req.param("aid");
    var categoryId = req.param("cid");

    am.list(req.db, {categoryId: categoryId}).done(function(list) {
        var article = _.find(list, function(a){
            return a._id == id;
        });

        console.log(list);

        var titleList = _.map(list, function(item) {
            return _.pick(item, ["_id","articleName"]);
        });



        res.render("article/tabedArticle.jade", {article: article, list: titleList});
    });



}