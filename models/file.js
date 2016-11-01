/**
 * Created by 周杨 on 2016/10/24.
 */
var fs=require("fs");
exports.getAllAlbums=function(callback){
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
exports.getAllImages=function(albumName,callback){
    fs.readdir('./uploads/'+albumName,function(err,files){
        if(err){
            throw err;
        }
        var allImages=[];
        (function iterator(i){
            if(i==files.length){
                callback(allImages);
                return;
            }
            fs.stat('./uploads/'+albumName+'/'+files[i],function(err,stats){
                if(err){
                    console.log('找不到文件'+files[i]);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
};