/**
 * Created by comcow on 14-1-29.
 */


exports.image = function(req, rsp) {
    var path = req.files.Filedata.path;
    path = path.replace(/public\\/, "/").replace("\\", "/");
    console.log(path);
    rsp.send({imgUrl: path});
}