var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
    if(req.method == 'GET' && req.url.substr(0,7) == '/images' && req.url.substr(-4) === '.jpg'){
        fs.stat(__dirname + req.url, function (err, stat) {
            if(err || !stat.isFile()){
                notFound(res);
                return;
            }
            serve(__dirname + req.url, 'application/jpg', res)
        });
    }else if(req.method == 'GET' && req.url === '/'){
        serve(__dirname + "/index.html", 'text/html', res)
    }else{
        notFound(res);
    }
});
server.listen(3000);

function notFound(res) {
    res.writeHead('404');
    res.end('Not Found!');    
}

function serve(path, type, res) {
    res.writeHead(200, {"Content-Type":type});
    fs.createReadStream(path).pipe(res);
}