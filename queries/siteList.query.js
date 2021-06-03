const { ddb } = require('../utils/dynamo');

const getSiteListQuery = async () => {
    const params = {
        TableName:"luke_site_list_table"
    };
    
    const result = ddb.scan(params).promise();

    return (await result).Items;
}

module.exports = {
    getSiteListQuery
}