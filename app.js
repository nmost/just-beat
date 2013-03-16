
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// App Logic

var masterArray = {}; //An object of objects, each containing a session (a song list, a control socket, a player socket, and the current song) keyed on a session token
var currentToken = 1000; //start the token at 1000, it will keep increasing forever - this should be eventually changed

// Sockets
  //TODO: socket shit goes here
  io.sockets.on('connection', function(socket){
    //Connecting and Disconnecting
    socket.on('newPlayer', function(data){
      var toke = ++currentToken;
      masterArray[toke] = { tracklist: data, player: socket, controllers: []};
      socket.emit('newToken', toke );
    });
    socket.on('newController', function(token){
      if(masterArray[token]){
        masterArray[token].controllers.push(socket.id);
        socket.emit('success', masterArray[token].tracklist);
        return;
      }
      socket.emit('error', "Something fucked up man. Try again or something");
    });


    //Playing Tracks
    socket.on("playTrack", function(data){
      console.log(data);
      masterArray[data.token].player.emit("playTrack", data.songID);
    });
  });


// Routes

app.get('/player', function(req, res){
  res.render('index', { title: 'JustBeat Player' }) 
});
app.get('/controls', function(req, res){
 res.render('controller', { title: 'JustBeat Controls' });
});


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
