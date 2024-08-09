import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dynamoDB } from "../aws-config";
import { randomInt } from "crypto";

const router = Router();

router.get("/register/:email/:password", async (req, res) => {
  // const { email, password } = req.body;
  const { email, password } = req.params;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = randomInt(1, 1000000);
  console.log(hashedPassword);

  const params = {
    TableName: "users",
    Item: {
      user_id: userId,
      email,
      password: hashedPassword,
    },
  };

  await dynamoDB.put(params).promise();
  res.status(201).send("User created");
});

router.get("/login/:email/:password", async (req, res) => {
  // const { email, password } = req.body;
  const { email, password } = req.params;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const params = {
    TableName: "users",
    IndexName: "email-index", // Name of GSI
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  const data = await dynamoDB.query(params).promise();

  if (data.Items === undefined) {
    return res.status(401).send("Authentication failed");
  }

  const user = data.Items[0];

  console.log(data);

  console.log(user);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).send("Authentication failed");

  const token = jwt.sign({ email: user.email }, "secretKey", {
    expiresIn: "24h",
  });

  res.json({ token });
});

export default router;
