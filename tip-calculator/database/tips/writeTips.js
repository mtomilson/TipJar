var AWS = require("aws-sdk")

let awsConfig = {
    "region": "us-east-1",
    "accessKeyId": "AKIAQ3EGTET4QLUWWBGP",
    "secretAccessKey": "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"
}

AWS.config.update(awsConfig)

let docClient = new AWS.DynamoDB.DocumentClient()

export function write(data) {
    
}