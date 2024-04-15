var AWS = require("aws-sdk")

let awsConfig = {
    "region": "us-east-1",
    "accessKeyId": "AKIAQ3EGTET4QLUWWBGP",
    "secretAccessKey": "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"
}

AWS.config.update(awsConfig)

let docClient = new AWS.DynamoDB.DocumentClient()

export function readTable() {
    var params = {
        TableName: "Tips",
        Key: {
            UserID: "mtomilson",
            Date: "04-15-2024"
        }

    };

    docClient.get(params, function(err, data) {
        if(err) {
            console.log("Error" + JSON.stringify(err, null, 2))
        }
        else {
            console.log("success" + JSON.stringify(data,null,2))
        }
    })

}

