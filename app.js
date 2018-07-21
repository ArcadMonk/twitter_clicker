var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    sys = require('sys'),
    twitter = require('twitter');

app.listen(8080);

var twit = new twitter({
  consumer_key: 'SiHw81k3jwvpYdEXMUvgdY7ag',
  consumer_secret: 'DoWAQhEiypdiMenCwrhvGk7HJiLDO4ZFyjpdk3HMREGnFTdeHI',
  access_token_key: '2282393588-cF1Sgit0HsDKOC2WGrCANCHnbyE7fFPuBcvH1xe',
  access_token_secret: 'Li5N2o3X2772fL5vr93gqtYi8raV9i1PDOkDouICagRwP'
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


twit.stream('statuses/filter', { track: 'pizza' }, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('tweet', data.text);
    console.log('.');
  });
});
