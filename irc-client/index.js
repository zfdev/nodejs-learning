const net = require('net');
let client = net.connect(6667, 'irc.freenode.net');
client.setEncoding('utf-8');
client.on('connnet', function(){
    client.write('NICK JasonZhang\r\n');
    client.write('USER JasonZhang 0 * :Jason\r\n');
    client.write('JOIN #node.js\r\n');
});

client.on('error', function(err){
    console.log(err);
});