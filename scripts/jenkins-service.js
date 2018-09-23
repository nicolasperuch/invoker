const axios = require('axios');
const fs = require('fs');
const jenkins = require('../client/jenkins-rest-client');
const utils = require('../utils/bot-utils')

module.exports = function(robot){
    
  robot.respond(/jenkins job (.*) exists\?/i, function(res){
    let target = utils.getUserData(res)
    jenkins.targetJobExists(target, res)
  }); 

  robot.respond(/create pipeline from (.*) with name (.*)/i, function(res){
    let jobUrl = utils.getUserData(res)
    let jobName = utils.getJobName(res)

    fs.readFile('pipeline-model.xml', 'utf8', function(err, contents) {
      let words = contents.split(" ");
      let placeholder = '';
      let gitUrl = '';
      let pipelineBody = '';

      words.filter(w => {
        if(w.startsWith("<url>")){
            placeholder = w
            gitUrl = '<url>' + jobUrl + '</url>\n'
        }
      })

      pipelineBody = contents;
      pipelineBody = pipelineBody.replace(placeholder, gitUrl)
      jenkins.createItem(pipelineBody, jobName, res)
    });
  }); 


  robot.respond(/jenkins build (.*)/i, function(res){
    let job = utils.getUserData(res)
    jenkins.buildJob(job, res)
  }); 
}