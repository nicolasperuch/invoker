const fs = require('fs');

module.exports = function(robot){
    robot.respond(/build model/i, function(res){
        fs.readFile('model.txt', 'utf8', function(err, contents) {
            var words = contents.split(" ");
            var wordsToChange = [];
            answer = '\"';
            words.filter(w => {
                if(w.startsWith("%")){
                    wordsToChange.push(w)
                }
            })

            user = {stage: 0, wordsToChange: wordsToChange, newWords: []}
            name = res.message.user.name.toLowerCase()
            
            robot.brain.set(name, user)
            res.send("*Words to change*")
            wordsToChange.forEach(w => res.send(w))
            res.send("Would you like to change " + wordsToChange[0] + " for which word?")
        });
    });
    
    robot.hear(/(.*)/i, function(res){
        name = res.message.user.name.toLowerCase()
        user = robot.brain.get(name)
        if (user != null && user.stage > -1){
            let answer = '\"'
            let userAnswer = res.match[0];
            if(userAnswer.startsWith("@invoker")){
               answer += userAnswer.slice(9)
            } else {
                answer += userAnswer
            }
            answer += '\"'

            console.log(answer)
            user.name = answer
            user.newWords.push(answer)    
            res.send("Changed " + user.wordsToChange[user.stage] + " for " + answer)
            user.stage++;            

            if(user.wordsToChange[user.stage]){
                res.send("Would you like to change " + user.wordsToChange[user.stage] + " for which word?")
            } else {
                fs.readFile('model.txt', 'utf8', function(err, contents) {
                    var newModel = contents;

                    res.send("> *Changes*")
                    for(let i=0; i < user.stage ;i++){
                        res.send(user.wordsToChange[i] +" -> *" + user.newWords[i] + "* :illusion:")
                        newModel = newModel.replace(user.wordsToChange[i], user.newWords[i])
                    }
                    
                    fs.writeFile('new-model.txt', newModel, (err) => {  
                        if (err) throw err;
                        res.send("File create :dd:");
                    });

                    user.stage = -1;
                });
            }

            robot.brain.set(name, user)
        }
    });

    robot.respond(/show new words/i, function(res){
        name = res.message.user.name.toLowerCase()
        user = robot.brain.get(name)
        try {
            res.send("new words: "+ user.newWords)
        } catch (e){
            res.send("seems like you did not build you model yet!")
        }
    })
}