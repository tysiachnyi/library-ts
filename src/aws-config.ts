// src/aws-config.ts
import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-central-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const dynamoDB = new AWS.DynamoDB.DocumentClient();
