// src/aws-config.ts
import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-central-1", // Replace with your DynamoDB region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your access key id
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your secret access key
});

export const dynamoDB = new AWS.DynamoDB.DocumentClient();
