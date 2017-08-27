var friendsData = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });
  
  app.post("/api/friends", function(req, res) {
    
    var usertotalScore;
    var totalscoreArray = [];
    var minScore;
    var minScoreIndex;
   
    for (var i = 0; i < friendsData.length; i++) {
      var absolutescoreArray = [];
      for (var j = 0; j < friendsData[i].userScores.length; j++) {
        absolutescoreArray.push(Math.abs(friendsData[i].userScores[j] - parseInt(req.body.userScores[j])));
      };      
      usertotalScore = absolutescoreArray.reduce(function(sum, value) {
        return sum + value;
      });      
      totalscoreArray[i] = usertotalScore;
    };  
    minScore = totalscoreArray.reduce(function(a, b) {
      return Math.min(a, b);
    });
    minScoreIndex = totalscoreArray.indexOf(minScore);
    friendsData.push(req.body);    
    res.json(friendsData[minScoreIndex]); 
  });    
};



