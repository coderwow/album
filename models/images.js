/**
 * Created by 周杨 on 2016/10/24.
 */
var fs=require("fs");
exports.getAllImages=function(callback){
    fs.readdir('./uploads',function(err,files){
        var allAlbums=[];
        (function iterator(i){
            if(i==files.length){
                callback(allAlbums);
                return;
            }
            fs.stat('./uploads/'+files[i],function(err,stats){
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
};