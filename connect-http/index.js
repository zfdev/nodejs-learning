var connect = require('connect');
var time = require('./request-time');
var users = require("./user.json");
var bodyParser = require('body-parser');
//var redisStore = require('connect-redis')(connect);

var server = connect.createServer();
server.use(connect.static(__dirname + "/website"));

server.use(connect.logger('dev'));
server.use(time({time: 500}));
server.use(connect.cookieParser());
server.use(connect.bodyParser());
server.use(connect.session({
    //store: new redisStore(),
    secret: "JasonSecret"
}));

server.use(function (req, res, next) {
    if('/user' ==  req.url && req.session.logged_in){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end('Welcome back, <b>' + req.session.name + '</b>' + '<a href="/logout">Logout</a>');
    }else{
        next();
    }
});

server.use(function (req, res, next) {
    if('/index' ==  req.url && req.method == 'GET'){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end([
            '<form action="/login" method="POST">',
            '<filedset>',
                '<legend>Please log in</legend>',
                '<p>User:<input type="text" name="user"></p>',
                '<p>Password:<input type="password" name="password"></p>',
                '<button>Submit</button>',
            '</filedset>',
            '</form>'
        ].join(''));
    }else{
        next();
    }
});

server.use(function (req, res, next) {
    if('/login' ==  req.url && req.method == 'POST'){
        res.writeHead(200, {"Content-Type": "text/html"});
        if(!users[req.body.user] || req.body.password != users[req.body.user].password){
            res.end('<p>Bad username/password</p>');
        }else{
            req.session.logged_in = true;
            req.session.name = users[req.body.user].name;
            res.end('<p>Authenticated!</p>');
        }
    }else{
        next();
    }
});

server.use(function (req, res, next) {
    if('/logout' ==  req.url){
        req.session.logged_in = false;
        res.writeHead(200);
        res.end('Logged out!');
    }else{
        next();
    }
});

server.use(function (req, res, next) {
    if('/a' ==  req.url){
        res.writeHead(200);
        res.end('Fast');
    }else{
        next();
    }
});

server.use(function (req, res, next) {
    if('/b' ==  req.url){
        setTimeout(() => {
            res.writeHead(200);
            res.end('Slow');           
        }, 1000);

    }else{
        next();
    }
});

server.use(connect.bodyParser());
server.use(function (req, res, next) {
    if(req.method == "POST" && req.url== "upload"){
        console.log(req.body.file);
    }else{
        next();
    }
    
});

server.use(function (req, res, next) {
    res.writeHead(404);
    res.end('Not found.');
});

server.listen(3000);