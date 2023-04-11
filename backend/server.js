import express from "express";
import cors from "cors";
import noteRouter from "./noteRouter.js";
import db from "./databaseConnection.js";
import credentials from "./config.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(noteRouter);

app.use((req, res, next) => {
  next(new Error("Page not found"));
});

app.use((error, req, res, next) => {
  if (error) {
    res.status(404).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

app.listen(credentials.port, () => {
  console.log("Server created");
});
