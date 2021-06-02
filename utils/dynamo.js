const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-2" });

const credentials = new AWS.SharedIniFileCredentials({profile:'luke-bbd-aws'});
AWS.config.credentials = credentials;

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

module.exports = {
    ddb
} 