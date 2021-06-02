const { ddb } = require('../utils/dynamo');

const insertItemQuery = (data) => {
    const params = {
        TableName:"site_monitoring_table",
        Item: {
            "SiteId":{
                "S":data.SiteId
            },
            "SiteName":{
                "S":data.SiteName
            },
            "Status":{
                "S":data.Status
            },
            "TimeToExist":{
                "N":`${data.TimeToExist}`
            }
        }
    }

    ddb.putItem(params, (err, data) => {
        if(err){
            console.log(err);
        }
    });
}

module.exports = {
    insertItemQuery
}