var Promise = require("promise");
var am = require("./admin/manager/ArticleManager");
var cm = require("./admin/manager/CategoryManager");
var _ = require("lodash");


exports.show = function(req, res) {
    var id = req.param("aid");
    var cid = req.param("cid");

    Promise.all(am.list(req.db, {categoryId: cid}), cm.list(req.db, {})).done(function(data) {
        var aList = data[0], clist = data[1];
        var article = aList[0];

        if (typeof id != "undefined") {
            article = _.find(aList, function(a){
                return a._id == id;
            });
        }

        var titleList = _.map(aList, function(item) {
            return _.pick(item, ["_id","subCategory"]);
        });

        _.forEach(clist, function(c) {
            if (c._id == cid) {
                c.active = true;
            }
        });

        res.render("article/tabedArticle.jade", {article: article, titleList: titleList, categories: clist});
    });



}