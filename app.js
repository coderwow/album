/**
 * Created by 周杨 on 2016/10/24.
 */
var express=require('express');
var router=require('./controller/router.js');
var app=express();

//设置模板引擎
app.set('view engine','ejs');

//路由中间件
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
//首页
app.get('/',router.showIndex);
app.get('/add',router.showAdd);
app.post('/add',router.doAdd);
app.get('/:albumName',router.showAlbumName);
app.use(router.showError);
app.listen(3000);
