const shell = require('shelljs');
const utils = require('../utils/bot-utils')

module.exports = function(robot){
    
    robot.respond(/copy jenkinsfile to (.*)/i, function(res){
        let repository = utils.getUserData(res)
        shell.cd('shell')
        shell.exec('./git.sh ' + repository)
        res.send('Done :)')
    });
}