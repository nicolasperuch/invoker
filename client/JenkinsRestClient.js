const axios = require('axios');

const BASE_PATH = 'http://localhost:8080/'
const CHECK_IF_JOB_EXISTS = 'checkJobName?value='

function targetJobExists(targetJob, robot){
    axios.get(
            buildUrl(BASE_PATH, CHECK_IF_JOB_EXISTS, targetJob), 
            { 'headers': buildHeaders() } 
        )
        .then(response => {
            robot.send(targetJob + jobExists(response))
        })
        .catch(error => {
            console.log(error)
            robot.send('Srry, we had some error during the process :\'(')
        });
}

function buildUrl(base, action, param){
    return base + action + param;
}

function buildHeaders(){
    return { 
        'Authorization': 'Basic YWRtaW46YWRtaW4=' 
    }
}

function jobExists(response){
    return response.data.includes('already exists') ? 
                ' already exists :dota_cry:' : 
                ' does not exists! :dota_smile:'
}

module.exports = {
    targetJobExists : targetJobExists
}