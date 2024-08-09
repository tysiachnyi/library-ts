// src/index.ts
import express from "express";
import bookRouter from "./routes/book";
import authRouter from "./routes/auth";

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Hello!");
});

// Use the book routes
app.use("/book", bookRouter);

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
