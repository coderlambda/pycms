var Promise = require("promise");
var am = require("./admin/manager/ArticleManager");
var cm = require("./admin/manager/CategoryManager");
var _ = require("lodash");

function fill(n) {
    n = "" + n;
    if (n.length == 1) {
        return "0" + n;
    }
    return n;
}

exports.show = function(req, res) {
    var id = req.param("aid");
    var cid = req.param("cid");
    var isHome = false;
    var amResult = null;
    var cmResult = cm.list(req.db, {});

    if (!cid || cid == "") {
        isHome = true;
        amResult = new Promise(function(resolve, reject){
            cmResult.done(function(data) {
                cid = "" + _.find(data, {categoryName: "首页"})._id;
                console.log(cid);
                am.list(req.db, {categoryId: cid}).done(function(data){
                    resolve(data);
                });
            });
        })
    } else {
        amResult = am.list(req.db, {categoryId: cid})
    }

    Promise.all(amResult, cmResult).done(function(data) {
        var aList = data[0], clist = data[1];
        var article = aList[0];

        if (typeof id != "undefined") {
            article = _.find(aList, function(a){
                return a._id == id;
            });
        }

        var titleList = _.map(aList, function(item) {
            var date = item.gmt_create;
            if (date) {
                date = new Date(parseInt(date));
                date = date.getFullYear() + "-" + fill(date.getMonth() + 1) + "-" + fill(date.getDate());
                item.gmt_create = date;
            }
            return _.pick(item, ["_id","subCategory", "articleName", "gmt_create"]);
        });

        _.find(clist, function(c, i) {
            if (isHome && i == 0) {
                c.active = true;
                return true;
            }

            if (c._id == cid) {
                c.active = true;
                if (i == 0) {
                    isHome = true;
                }
                return true;
            }
        });

        if (isHome) {
            var newsList = _.filter(titleList, {subCategory:'news'});
            var noticeList = _.filter(titleList, {subCategory:'notice'});

            console.log(newsList);
            console.log(noticeList);

            res.render("index.jade", {article: article, newsList: newsList, noticeList: noticeList, categories: clist});
        } else if (titleList.length == 1) {
            res.render("article/singleArticle.jade", {article: article, titleList: titleList, categories: clist});
        } else {
            res.render("article/tabedArticle.jade", {article: article, titleList: titleList, categories: clist});
        }
    });



}