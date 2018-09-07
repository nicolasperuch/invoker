module.exports = function(robot){
    
  robot.respond(/quas/i, function(res){
    res.send("https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/4/4a/Quas_icon.png");
  });
  
  robot.respond(/wex/i, function(res){
      res.send("https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/9/94/Wex_icon.png");
  }); 

  robot.respond(/exort/i, function(res){
    res.send("https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/d/d2/Exort_icon.png");
  });     
}