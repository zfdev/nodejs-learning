var http = require('http');
var fs = require('fs');
var path = require('path');
var queryString = require('querystring');
// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('Hello');
//     setTimeout(function(){
//         res.end('<strong>Jason</strong>');
//     }, 1000);
    
// }).listen(3000);
// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'image/jpg'});
//     var stream = fs.createReadStream('D:/OS/DSC_1803.jpg');
//     // stream.on('data', function(data){
//     //     res.write(data);
//     // })
//     // stream.on('end', function(){
//     //     res.end();
//     // })
//     stream.pipe(res);
// }).listen(3000);

var httpServer = http.createServer(function(req, res){
    // console.log('Server listening on port 3000.');
    // console.log('Request Object:');
    // console.log(req);
    // console.log('Response Object:');
    // console.log(res); 
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(req.url === '/'){
        res.end([
            '<form method="POST" action="/url">',
                '<h1>My Form</h1>',
                '<fieldset>',
                '<label>Personal Information</label>',
                '<p>What is your name?</p>',
                '<input type="text" name="name">',
                '<p><button>Submit</button></p>',
                '</fieldset>',
            '</form>',
        ].join(''));
    }else if(req.method === 'POST' && req.url === '/url'){
        let body = '';
        //Request send data bind function
        req.on('data', function(chunk){
            //Sava data buffer
            body += chunk;
            //Request finish sending data, we will send response html 
            req.on('end', function(){
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                // res.end(
                //     '<p>Content-Type: ' + req.headers['content-type'] + '</p>' +
                //     '<p>Data:<pre>' + body + '</pre></p>'
                // );
                res.end('<p>Your name is <b>' + queryString.parse(body).name + '</b></p>');
            });
        });
    }else{
        res.writeHead(404);
        res.end('Not Found');
    }

    
}).listen(3000);
httpServer.on('error', (err)=>{
    console.log(err);
});