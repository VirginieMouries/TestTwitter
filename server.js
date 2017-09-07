// j'utilise le framewok express pour créér mon serveur en Node.js
var express = require('express');
// j'utilise le module twitter
var Twitter = require('twitter');

// je créér application qui utilise express
var app = express();

// creation d'un server http à partir de mon serveur express
var server = require('http').createServer(app); 

// socket io encapsule mon serveur
var io = require('socket.io')(server);

// je démarre mon serveur web node sur le port 3000
server.listen(3000, function() {
    console.log('listening on 3000');
});

// J'instancie la "class" twitter avec les jetons récupèré en déclarant mon appli sur twitter
var twitter = new Twitter({
    consumer_key: 'I3KoCekQOzuBTfLMnCfRpHFjq',
    consumer_secret: '9wjZDhP9ffj39fvUT7E6UsCnF6hNal8271eRJBRWYxSDeCg6wB',    
    access_token_key: '905689580028010496-vnnLJwxynBZqGXfZfXMh9L0sO05k6GW',
    access_token_secret: 'GpuMGq5KEnVuHdV5us48uqVWGhKDRhrYfmHftXwNT0WbG'
});

// je demande à Twitter de récupèrer les contribuions avec #javaScript
twitter.stream('statuses/filter', { track: '#javaScript' },function(stream) {
 
    stream.on('data', function( tweet ) {
        var tweet_id = tweet.id_str;
        var tweet_text = tweet.text;
        // j'affiche dans ma console
        console.log(tweet_text);
        io.socket.emit("newTweet",tweet_text)
    });
 
    stream.on('error', function ( error ) {
        console.error(error);
    });
});

// je déclare mon dossier qui contient mes vues
app.set('views', './views');

// je renvoie l'index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});


