var AWS = require("aws-sdk")

let awsConfig = {
    "region": "us-east-1",
    "accessKeyId": "AKIAQ3EGTET4QLUWWBGP",
    "secretAccessKey": "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"
}

AWS.config.update(awsConfig)

let docClient = new AWS.DynamoDB.DocumentClient()

export function writeTips(creditTips, date, netSales, barSales, grossSales, cashTips) {
    var input = {
        "UserID": "mtomilson", 
        "CreditTips": creditTips, 
        "Date": date,
        "NetSales": netSales,
        "BarSales": barSales,
        "GrossSales": grossSales,
        "CashTips": cashTips
    }
    var params = {
        TableName: "Tips",
        Item: input
    }

    docClient.put(params, function(err, data) {
        if (err) {
            console.log("error ")
        }
        else {
            console.log("success")
        }
    })

}