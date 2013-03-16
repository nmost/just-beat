var toke = '';
var socket = io.connect("http://localhost");
function codeChanged(token){
  toke = token;
  $("#trackBox").html('');
  socket.emit('newController', token);

  socket.on('success', function(data){
    $('#header').html("Awesome! Let's just play some beats");
    for(number in data){
      $('#trackBox').append('<div class="song"><input class="play" type="button" value="' + data[number] + '" onclick="playSong(' + number + ')" class="song" /><input type="button" onclick="queueSong(' + number + ')" value="Queue" class="queue" />');
    }
  });
  socket.on('error', function(data){
    $('#header').html(data);
  });
}

function queueSong(number){
}
function playSong(number){
  socket.emit('playTrack', { 'token': toke, 'songID': number });
}
