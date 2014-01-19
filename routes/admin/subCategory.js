/**
 * Created by cangya.jyt on 13-12-25.
 */

var scm = require("./manager/SubCategoryManager");

exports.list = function(req, res) {
    var id = req.param("cid");
    scm.list(req.db, {categoryId:id}).done(function(list){
        res.render('admin/subCategory/list.jade', {categories: list});
    });
}

exports.modify = function(req, res) {
    var db = req.db;
    var categoryId = req.param("cid");
    var addCategory = req.param("addCategoryName");
    var idList = req.param("categoryId");
    var categoryList = req.param("categoryName");
    var id;

    if (addCategory && addCategory != "") {
        scm.add(db, {subCategoryName: addCategory, categoryId: categoryId});
    }
    while (id = idList.pop()){
        scm.update(db,{
            _id:id,
            categoryName: categoryList.pop()
        })
    }

    res.redirect('/admin/subCategory/?cid=' + categoryId);
}

