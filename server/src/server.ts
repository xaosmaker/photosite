import express from "express";

export const app = express();
app.use(express.json());

app.get("/api", (_req, res) => {
  res.json({ hello: "hello" });
});
