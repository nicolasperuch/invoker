const axios = require('axios');

const BASE_PATH = 'http://localhost:8080/'
const CHECK_IF_JOB_EXISTS = 'checkJobName?value='
const CREATE_ITEM = 'createItem?name='

function targetJobExists(targetJob, res){
    axios.get(
            buildUrl(BASE_PATH, CHECK_IF_JOB_EXISTS, targetJob), 
            { 'headers': buildHeaders() } 
        )
        .then(response => {
            res.send(targetJob + jobExists(response))
        })
        .catch(error => {
            console.log(error)
            res.send('Srry, we had some error during the process :\'(')
        });
}

function buildJob(targetJob, res){
    axios.post(
            BASE_PATH + 'job/' + targetJob + '/build', '',
            { 'headers': buildHeaders()}
        )
        .then(response => {
            res.send('Job successfully built :dota_laugh:')               
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        });
}

function createItem(pipelineBody, jobName, res){
    axios.post(
            buildUrl(BASE_PATH, CREATE_ITEM, jobName),
            pipelineBody.toString(),
            { 'headers': buildHeaders() }
        )
        .then(response => {
            res.send('Job successfully created :dota_laugh:')               
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        });
}

function buildUrl(base, action, param){
    return base + action + param;
}

function buildHeaders(){
    return { 
        'Authorization': 'Basic YWRtaW46YWRtaW4=' ,
        'Content-Type' : 'text/xml',
        'Jenkins-Crumb' : 'bebea6b21e40e004f6968da1fa63bea7'
    }
}

function jobExists(response){
    return response.data.includes('already exists') ? 
                ' already exists :dota_cry:' : 
                ' does not exists! :dota_smile:'
}

module.exports = {
    targetJobExists : targetJobExists,
    buildJob : buildJob,
    createItem : createItem
}