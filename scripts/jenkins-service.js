const axios = require('axios');
const pipelineBody = 
'<?xml version=\'1.1\' encoding=\'UTF-8\'?>\
<flow-definition plugin="workflow-job@2.25">\
  <actions>\
    <org.jenkinsci.plugins.pipeline.modeldefinition.actions.DeclarativeJobAction plugin="pipeline-model-definition@1.3.2"/>\
  </actions>\
  <description></description>\
  <keepDependencies>false</keepDependencies>\
  <properties/>\
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition" plugin="workflow-cps@2.55">\
    <scm class="hudson.plugins.git.GitSCM" plugin="git@3.9.1">\
      <configVersion>2</configVersion>\
      <userRemoteConfigs>\
        <hudson.plugins.git.UserRemoteConfig>\
          <url>https://github.com/nicolasperuch/micro-hello-world.git</url>\
          <credentialsId>nicolasperuch</credentialsId>\
        </hudson.plugins.git.UserRemoteConfig>\
      </userRemoteConfigs>\
      <branches>\
        <hudson.plugins.git.BranchSpec>\
          <name>*/master</name>\
        </hudson.plugins.git.BranchSpec>\
      </branches>\
      <doGenerateSubmoduleConfigurations>false</doGenerateSubmoduleConfigurations>\
      <submoduleCfg class="list"/>\
      <extensions/>\
    </scm>\
    <scriptPath>Jenkinsfile</scriptPath>\
    <lightweight>true</lightweight>\
  </definition>\
  <triggers/>\
  <disabled>false</disabled>\
</flow-definition>'

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
    axios.get('http://localhost:8080/checkJobName?value=' + job, { 
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

  robot.respond(/jenkins create pipeline job (.*)/i, function(res){
    let job = res.match[1]
    axios.post('http://localhost:8080/createItem?name=' + job, 
            pipelineBody,
            { 
            'headers': 
                { 
                  'Authorization': 'Basic YWRtaW46YWRtaW4=' ,
                  'Content-Type' : 'text/xml',
                  'Jenkins-Crumb' : '7c64a13bd78a47e6c79352403dd4daff'
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