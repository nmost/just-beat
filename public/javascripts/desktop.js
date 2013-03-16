var songsarray;
var player = document.getElementById("audioPlayer");
function handleFileChange(files){
  songsarray = files;
  var filenames = {};
  var valid = false;
  for (var num in files){
    if (files.hasOwnProperty(num) && files[num].name && files[num].name.slice(-3) === 'mp3'){
      filenames[num] = files[num].name;
      /*var f = window.URL.createObjectURL(files[num]);
      player.src = f;
      player.play();*/
      if (!valid)
        valid = true;
    }
  }
  if(!valid){
    alert("I need MPTHREEZ bro");
    return;
  }
  var socket = io.connect("http://localhost");
  socket.emit('newPlayer', filenames);
  socket.on('newToken', function(token) {
    $("#tokenContainer").html("Punch in " + token + " on your controller");
  });
  socket.on('playTrack', function(songID){
    player.pause();
    var f = window.URL.createObjectURL(songsarray[songID]);
    player.src = f;
    player.play();
  });
}
