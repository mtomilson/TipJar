import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_4rglpKxS6",
    ClientId: "16u144gse9qujuku0ouvhtn3nt"
}

export default new CognitoUserPool(poolData)