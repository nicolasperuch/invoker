const axios = require('axios');
const body = 
'<?xml version="1.0" encoding="UTF-8"?><project>\
<description/>\
<keepDependencies>false</keepDependencies>\
<properties/>\
<scm class="hudson.scm.NullSCM"/>\
<canRoam>true</canRoam>\
<disabled>false</disabled>\
<blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>\
<blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>\
<triggers/>\
<concurrentBuild>false</concurrentBuild>\
<builders>\
  <hudson.tasks.Shell>\
    <command>echo hello world</command>\
  </hudson.tasks.Shell>\
</builders>\
<publishers/>\
<buildWrappers/>\
</project>'

module.exports = function(robot){
    
  robot.respond(/show jenkins jobs/i, function(res){
    jenkins.info(function(err, data) {
        if (err) throw err;
        console.log(data)
        res.send('First job name: '+ data.jobs[0].name);
        res.send('First job url: '+ data.jobs[0].url);
        res.send('First job type: '+ data.jobs[0]._class);
      });
  });

  robot.respond(/jenkins job (.*) exists\?/i, function(res){
    let job = res.match[1]
    axios.get('http://localhost:8081/checkJobName?value=' + job, { 
            'headers': 
                { 
                  'Authorization': 'Basic YWRtaW46YWRtaW4=' 
                } 
            })
            .then(response => {
                let data = response.data
                console.log(data)                
                if(data.includes("already exists")){
                  res.send(job + ' already exists :dota_cry:')
                } else {
                  res.send(job + ' does not exists! :dota_smile:')
                }
            })
            .catch(error => {
                console.log(error)
                res.send(error)
            });
  }); 

  robot.respond(/jenkins create job (.*)/i, function(res){
    let job = res.match[1]
    axios.post('http://localhost:8081/createItem?name=' + job, 
            body,
            { 
            'headers': 
                { 
                  'Authorization': 'Basic *********' ,
                  'Content-Type' : 'text/xml',
                  'Jenkins-Crumb' : '*********'
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
}