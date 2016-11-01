/**
 * Created by 周杨 on 2016/10/24.
 */
var file=require('../models/file.js');
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");
exports.showIndex=function(req,res){
    file.getAllAlbums(function(allAlbums){
        res.render('index',{
            'albums':allAlbums
        })
    })
};
exports.showAdd=function(req,res) {
    file.getAllAlbums(function (allAlbums) {
        res.render('add', {
            'albums': allAlbums
        })
    })
};
exports.showError=function(req,res){
    res.render('error');
};
exports.showAlbumName=function(req,res){
    var albumName=req.params['albumName'];
    if(albumName=='favicon.ico'){
        return;
    }
    file.getAllImages(albumName,function(allImages){
        res.render('album',{
            'albumname':albumName,'images':allImages
        })
    })

};
exports.doAdd = function(req,res){
    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + "/../tempup/");

    form.parse(req, function(err, fields, files,next) {
        console.log(fields);
        console.log(files);
        //改名
        if(err){
            next();     //这个中间件不受理这个请求了，往下走
            return;
        }
        //判断文件尺寸
        var size = parseInt(files.file.size);
        if(size > 1048576){
            res.send("图片尺寸应该小于1M");
            //删除图片
            fs.unlink(files.file.path);
            return;
        }

        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.file.name);

        var wenjianjia = fields.wenjianjia;
        var oldpath = files.file.path ;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                res.send("改名失败");
                return;
            }
            res.send("成功");
        });
    });
    return;
};