import React from 'react'
import {useState} from 'react'

var AWS = require("aws-sdk")

let awsConfig = {
    "region": "us-east-1",
    "accessKeyId": "AKIAQ3EGTET4QLUWWBGP",
    "secretAccessKey": "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"
}

AWS.config.update(awsConfig)


let docClient = new AWS.DynamoDB.DocumentClient()

var data 

export function readTips(enteredDate) {

    // const [data, setData] = useState("")

    var params = {
        TableName: "Tips",
        Key: {
            UserID: "mtomilson",
            Date: enteredDate
        }

    };

    docClient.get(params, function(err, data) {

        console.log("Data that is being passed into docClient  " + data)
        if(err) {
            console.log("Error" + JSON.stringify(err, null, 2))
        }
        //  console.log("this is data in readTips file" + JSON.stringify(data))
        //  setData(data)
        else {
            console.log("data outside of func" + data)
        return(data)
        }
        })
        
    }   

