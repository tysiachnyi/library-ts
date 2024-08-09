import { Router } from "express";
import { dynamoDB } from "../aws-config";

const router = Router();

router.get("/", async (req, res) => {
  const params = {
    TableName: "library",
  };
  try {
    const data = await dynamoDB.scan(params).promise();
    console.log(data);
    res.json(data.Items);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Failed to fetch books");
  }
});

router.get("/:id", (req, res) => {
  const params = {
    TableName: "library",
    Key: {
      id: req.params.id,
    },
  };
  res.send("Fetching book Number " + req.params.id);
});

router.post("/", (req, res) => {
  // db work
  res.send("Book was added");
});

router.put("/:id", (req, res) => {
  // db work
  res.send(`Book with id ${req.params.id} was changed`);
});

export default router;
