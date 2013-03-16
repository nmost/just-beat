$(function(){
});

function handleFileChange(files){
  var filenames = {};
  var valid = false;
  for (var num in files){
    if (files.hasOwnProperty(num) && files[num].name && files[num].name.slice(-3) === 'mp3'){
      filenames[num] = files[num].name
      if (!valid)
        valid = true;
    }
  }
  if(!valid){
    alert("I need MPTHREEZ bro");
    return;
  }

  var postage = $.post('/newtracklist', filenames);
  
  postage.done( function(data) {
    console.log(data); 
  });
}
