/**
 * Created by cangya.jyt on 13-12-21.
 */
var basicArticleManager = require("./BasicManager.js")("articles");
var _ = require("lodash");

module.exports = _.extend(basicArticleManager, {
    /*
    getTitleList: function(db, category) {
        var col = db.collection("articles");
        return new Promise(function(resolve, reject) {
            col.find({categoryId: category}, {"title": true,
                "title": true }).toArray(baseDBCallback(resolve, reject));
        });
    }
    */
});