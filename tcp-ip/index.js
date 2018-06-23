const net = require('net');
let count = 0;
let users = {};
let server = net.createServer(function(conn){
    let nickname;
    conn.write(
        '\r\n > Welcome to \033[92m node-chat\033[39m!\r\n > ' + count + ' other people are connected at this time. \r\n > please write your name and press enter:'
    );
    //If a new user connect to the server, increase the count number.
    count++;
    conn.setEncoding('utf8');
    conn.on('data', function(data){
        console.log(data);
        if(/\r\n/.test(data)){
            console.log('User press enter key.');
        }
        data = data.replace('\r\n', '');
        console.log(data);
        //checkout user nickname is alreay existed or not.
        if(!nickname){
            //checkout if user connection is alreay existed in the user object
            if(users[data]){
                conn.write('\r\n > \033[93m nickname ' + data + ' is already in use. try another name: \033[39m ');
                return;
            }else{
                //create new user
                nickname = data;
                //save user connection to user object.
                users[nickname] = conn;
                //notice all the users someone is join to the chat server
                for(var user in users){
                    users[user].write('\033[90m > ' + nickname + ' joined the room.\033[39m\r\n');
                }
            }
        }else{
            //chat information
            //send all other users the chat message
            for(var user in users){
                if(user != nickname){
                    users[user].write('\033[96m > ' + nickname + ':\033[39m ' + data + '\r\n');
                }
            } 
        }
    });
    conn.on('close', function(){
        count--;
        console.log('Lose connection!');
        //if someone is disconnected, remove the connnection object from the users object.
        delete users[nickname];
    });
});
server.listen(3000, function(){
    console.log('\033[96m server listening on *:3000\033[39m');
});