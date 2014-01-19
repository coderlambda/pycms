/**
 * Created by cangya.jyt on 13-12-20.
 */

exports.index = function(req, res){
    res.render('admin/index.jade', { title: 'Express' });
};