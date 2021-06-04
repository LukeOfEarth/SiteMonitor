const { ddb } = require('../utils/dynamo');

const getSiteListQuery = async () => {
    const params = {
        TableName:"luke-site_list_table"
    };
    
    const result = ddb.scan(params).promise();

    return (await result).Items;
}

module.exports = {
    getSiteListQuery
}