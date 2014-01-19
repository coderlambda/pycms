/**
 * Created by cangya.jyt on 13-12-23.
 */
/**
 * Created by cangya.jyt on 13-12-21.
 */
var Promise = require("promise");
var ObjectID = require("mongodb").ObjectID;
var _ = require("lodash");

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
        list : function(db, condition) {
            var col = db.collection(collection);
            return new Promise(function(resolve, reject) {
// if (_.isObject(condition)) {
                col.find(condition).toArray(baseDBCallback(resolve, reject));
                //              } else {
                //              col.find().toArray(baseDBCallback(resolve, reject));
                //            }
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
            doc = _.omit(doc, "_id");
            doc = _.extend(doc,
                {
                    "gmt_create": new Date().getTime(),
                    "gmt_modify": new Date().getTime()
                }
            );
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
        update : function(db, doc) {
            var col = db.collection(collection);
            return new Promise(function(resolve, reject) {
                col.update({_id: ObjectID.createFromHexString(doc._id)}, _.extend(_.omit(doc, "_id"), {"gmt_modify": new Date().getTime()}), baseDBCallback(resolve, reject));
            });
        }
    }
}
