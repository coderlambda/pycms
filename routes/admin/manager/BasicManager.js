/**
 * Created by cangya.jyt on 13-12-23.
 */
/**
 * Created by cangya.jyt on 13-12-21.
 */
var Promise = require("promise");
var ObjectID = require("mongodb").ObjectID;

function baseDBCallback (resolve, reject) {
    return function (err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    }
}

module.exports = function(collection) {
    return {
        list : function(db) {
            var col = db.collection(collection);
            return new Promise(function(resolve, reject) {
                col.find().toArray(baseDBCallback(resolve, reject));
            });
        },
        get : function(db, id) {
            var col = db.collection(collection);
            return new Promise(function(resolve, reject) {
                col.findOne({_id: ObjectID.createFromHexString(id)}, baseDBCallback(resolve, reject));
            });
        },
        add : function(db, doc) {
            var col = db.collection(collection);
            return new Promise(function(resolve, reject) {
                col.save(doc, baseDBCallback(resolve, reject));
            });
        },
        del : function(db, id) {
            var col = db.collection(collection);
            return new Promise(function(resolve, reject) {
                col.remove({_id: ObjectID.createFromHexString(id)}, baseDBCallback(resolve, reject));
            });
        },
        updateArticle : function(db, doc) {
            var col = db.collection(collection);
            return new Promise(function(resolve, reject) {
                col.update({_id: ObjectID.createFromHexString(doc._id)}, doc, baseDBCallback(resolve, reject));
            });
        }
    }
}
