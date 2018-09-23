const axios = require('axios');
const fs = require('fs');
const jenkins = require('../client/JenkinsRestClient');
const utils = require('../utils/BotUtils')

module.exports = function(robot){
    
  robot.respond(/jenkins job (.*) exists\?/i, function(res){
    let target = utils.getUserData(res)
    jenkins.targetJobExists(target, res)
  }); 

  robot.respond(/create pipeline from (.*)/i, function(res){
    let job = res.match[1]
    let pipelineBody;

    fs.readFile('pipeline-model.xml', 'utf8', function(err, contents) {
      let words = contents.split(" ");
      let placeholder = '';
      let gitUrl = '';
      words.filter(w => {
        if(w.startsWith("<url>")){
            placeholder = w
            gitUrl = '<url>' + job + '</url>\n'
        }
      })

      pipelineBody = contents;
      pipelineBody = pipelineBody.replace(placeholder, gitUrl)
      
      axios.post('http://localhost:8080/createItem?name=pipeline-test', 
        pipelineBody.toString(),
        { 
        'headers': 
            { 
              'Authorization': 'Basic YWRtaW46YWRtaW4=' ,
              'Content-Type' : 'text/xml',
              'Jenkins-Crumb' : 'bebea6b21e40e004f6968da1fa63bea7'
            }
        })
        .then(response => {
            res.send('Job successfully created :dota_laugh:')               
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        });
    });
  }); 


  robot.respond(/jenkins build (.*)/i, function(res){
    let job = res.match[1]
    axios.post('http://localhost:8080/job/' + job + '/build',
            '',
            { 
            'headers': 
                { 
                  'Authorization': 'Basic YWRtaW46YWRtaW4=' ,
                  'Content-Type' : 'text/xml',
                  'Jenkins-Crumb' : 'bebea6b21e40e004f6968da1fa63bea7'
                }
            })
            .then(response => {
                res.send('Job successfully built :dota_laugh:')               
            })
            .catch(error => {
                console.log(error)
                res.send(error)
            });
  }); 
}