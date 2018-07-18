var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    sys = require('sys'),
    twitter = require('twitter');

app.listen(1337);

var twit = new twitter({
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  access_token_key: 'ACCESS_TOKEN_KEY',
  access_token_secret: 'ACCESS_TOKEN_SECRET'
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var twee = io.of('tweet');


twit.stream('statuses/filter', { track: 'javascript' }, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('tweet', data.text);
    console.log('.');
  });
});
