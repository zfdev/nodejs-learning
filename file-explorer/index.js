// var fs = require('fs'),
//     stdin = process.stdin,
//     stdout = process.stdout;
// var path = require('path');
// var stats = [];
// fs.readdir(process.cwd(), function(err, files) {
//     console.log('');
//     if (!files.length) {
//         return console.log('\33[31m No file to show! \033[39m\n');
//     }

//     console.log('Select which file or directory you want to see\n');

//     function file(i) {
//         var filename = files[i];
//         fs.stat(__dirname + '/' + filename, function(err, stat) {
//             stats[i] = stat;
//             if (stat.isDirectory()) {
//                 console.log('' + i + ' \033[36m' + filename + '/\033[39m');
//             } else {
//                 console.log('' + i + ' \033[90m' + filename + '\033[39m');
//             }
//         });
//         i++;
//         if (i == files.length) {
//             read();
//         } else {
//             file(i);
//         }
//     }
//     file(0);

//     function read() {
//         console.log('');
//         stdout.write('\033[33mEnter your choice: \033[39m\n');
//         stdin.resume();
//         stdin.setEncoding('utf8');
//         stdin.on('data', option);
//     }

//     function option(data) {

//         var filename = files[Number(data)];
//         if (!filename) {
//             stdout.write('\033[31mEnter your choice: \033[39m');
//         } else {
//             stdin.pause();
//             if (stats[Number(data)].isDirectory()) {
//                 fs.readdir(__dirname + '/' + filename, function(err, files) {
//                     console.log('');
//                     if (files.length) {
//                         console.log('(' + files.length + ' files)');
//                         files.forEach(function(file) {
//                             console.log('-' + file);
//                         });
//                         console.log('');
//                     } else {
//                         console.log('The directory' + __dirname + '/' + filename + 'is empty!');
//                     }

//                 })
//             } else {

//                 console.log(path.join(__dirname, '/', filename));
//                 fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {

//                     console.log('');
//                     console.log('\033[90m' + data.replace(/(.*)/g, '$1'));
//                 });
//             }
//         }
//     }
// });

var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;
var path = require('path');
var stats = [];

//Try read current directory file structure
fs.readdir(process.cwd(), function(err, files){
    console.log('');
    if(files.length === 0){
        return console.log('\33[31m No file to show! \033[39m\n');
    }
    console.log('Select which file or directory you want to see\n');
    //list all the files
    for(var index = 0; index < files.length; index ++){
        //is file or directory
        let filename = files[index];
        (function(index){
            fs.stat(__dirname + '/' + filename, function(err, stat){
                stats[index] = stat;
                if(stat.isDirectory()){
                    console.log('' + index + ' \033[36m' + filename + '/\033[39m');
                }else{
                    console.log('' + index + ' \033[90m' + filename + '\033[39m');
                }
            });         
        })(index);
    }

    function read(){
        console.log('');
        stdout.write('\033[33mEnter your choice: \033[39m\n');
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data', option); //Get user console input
    }

    read();

    function option(data){
        var filename = files[Number(data)];
        if(!filename){
            stdout.write('File ' + filename + 'is not exist.\n');
            stdout.write('\033[31mEnter your choice: \033[39m');
        }else{
            stdin.pause(); //Pause user input
            if(stats[Number(data)].isDirectory()){
                //Read the file in the directory
                console.log('');
                fs.readdir(__dirname + '/' + filename, function(err, files){
                    if(files.length){
                        console.log('(' + files.length + ' files)');
                        files.forEach(function(file) {
                            console.log('-' + file);
                        });
                        console.log('');                        
                    }else{
                        console.log('The directory' + __dirname + '/' + filename + 'is empty!');
                    }
                });

            }else{
                console.log(path.join(__dirname, '/', filename));
                fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
                    console.log('');
                    console.log(data);                    
                });
            }
        }
    }
});

var stream = fs.createReadStream('package.json');
stream.on('data', function(chunk){
    console.log(chunk);
})
stream.on('end', function(){
    console.log('Read file done.')
})


var watchFiles = fs.readdirSync(process.cwd());
watchFiles.forEach(function(file){
    if(/\.json/.test(file)){
        fs.watchFile(process.cwd() + '/' + file, function(){
            console.log(' - ' + file + ' changed!');
        })
    }
});

