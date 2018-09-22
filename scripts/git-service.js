module.exports = function(robot){
    
    robot.respond(/git (.*)/i, function(res){
        let answer = res.match[1]
        res.send('git url: '+answer)
    });
}