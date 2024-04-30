
    import AWS from 'aws-sdk';

    AWS.config.update({
        region: "us-east-1",
        accessKeyId: "AKIAQ3EGTET4QLUWWBGP",
        secretAccessKey: "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"
    });
    
    const docClient = new AWS.DynamoDB.DocumentClient();

    export async function readTips(enteredDate) {
        const params = {
            TableName: "Tips",
            Key: {
                UserID: "mtomilson",
                Date: enteredDate
            }
        };
    
        try {
            const data = await docClient.get(params).promise();
            if (data.Item && data.Item.CreditTips) {
                return JSON.stringify(data);
            } else {
                throw new Error("Tip data not found");
            }
        } catch (error) {
            console.error("Error fetching data from DynamoDB:", error);
            throw error;
        }
    }