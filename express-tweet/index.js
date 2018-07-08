var express = require('express');
var search = require('./search');
var app = express.createServer();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false});
//cache template
app.configure('production', function () {
    app.enable('view cache');
});

//大小写敏感
//严格路由

//路由自定义参数
app.get('/post/:name?', function (req, res) {
    req.params.name == '';
});

app.get('^\/post\/([a-z\d\-]*)', function (req, res) {
    req.params.name == '';
});

function auth(params) {
    
}

app.get('/post/:name?', auth, function (req, res) {
    req.params.name == '';
});

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/search', function (req, res, next) {
    search(req.query.q, function (err, tweets) {
        if(err){
            return next(err);
        }
        res.render('search', {results: tweets.statuses, search: req.query.q});
        //res.redirect 重定向
        //res.sendFile
    });
});

//错误处理中间件
app.error(function(err, req, res, next) {
    
});

//最后的500页面
app.error(function(err, req, res) {
    
});

app.listen(3000);