const shell = require('shelljs');

module.exports = function(robot){
    
    robot.respond(/git (.*)/i, function(res){
        let answer = res.match[1]
        res.send('git url: '+answer)
    });

    robot.respond(/git copy jenkinsfile to (.*)/i, function(res){
        let repository = res.match[1]
        res.send('git url: ' + repository)
        shell.cd('../shell')
        shell.exec('./git.sh ' + repository)
        res.send('done :)')
    });
}