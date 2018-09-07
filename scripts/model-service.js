const fs = require('fs');

module.exports = function(robot){
    robot.respond(/show model/i, function(res){
        fs.readFile('model.txt', 'utf8', function(err, contents) {
            res.send(contents)
        });
    });   
}