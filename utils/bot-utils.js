function getUserData(res){
    return res.match[1];
}

function getJobName(res){
    return res.match[2];
}

module.exports = {
    getUserData : getUserData,
    getJobName : getJobName
}