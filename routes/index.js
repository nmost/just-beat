exports.desktop = function(req, res){
  res.render('index', { title: 'Express' })
};
exports.mobile = function(req, res){
  res.render('mobile')
};
exports.newTrackList = function(req, res){
  console.log(req.body); 
  res.send(req.body);
}
