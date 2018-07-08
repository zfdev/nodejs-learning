var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'EOgIOdq67DaHbgJie8fBaImcr',
  consumer_secret: 'tHhlcJjv44skn3tS6eF0JhDLZmrqovAaMbQYMDYT5In60iWPgQ',
  access_token_key: '890155411092905984-kYXoNXZkrzC0fl9LO0hEoRVKgpvGM9g',
  access_token_secret: 'IXv06C5o8xWBUyIQOgiXKtMKVEcfiLBHKJnCVopmcHDIT'
});

module.exports = function search(query, fn) {
    // client.get('search/tweets', query).then(function(tweet) {
    //     console.log(tweet);        
    //     return fn(null, tweet);
    // }).catch(function (error) {
    //     throw error;
    // });
 
    client.get('search/tweets', {q: query}, function(error, tweets, response) {
        console.log(tweets);        
        return fn(null, tweets);
     });     

    //fn(new Error('Bad twitter response'));
    // client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
    //     console.log(tweets);
    //  });    
}