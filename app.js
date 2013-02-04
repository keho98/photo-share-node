var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.set('points', {});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) { 
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('report point', function(data){
    var arr = app.get('points');	
    arr[data.key] = data.point;
    app.set('points', arr);
    console.log(data);
  });
});
