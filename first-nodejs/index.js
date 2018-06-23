require('colors');
console.log('Jason Zhang'.rainbow);
var EventEmiiter = require('events').EventEmitter;
var a = new EventEmiiter();
a.on('event', function(){
    console.log('Event called.');
});
a.emit('event');
a.once('one', function(){
    console.log('One event');
});
a.emit('one');
a.emit('one');
a.emit('one');

var myBuffer = new Buffer('==ii1j2i3h1i23h', 'base64');
console.log(myBuffer);
require('fs').writeFile('logo.png', myBuffer);

var stream = require('fs').creatReadStream('./logo.png');
stream.on('data', function(chunk){
    console.log(chunk);
});
stream.on('end', function(chunk){
    console.log(`Read file ${chunk} done.`);
});