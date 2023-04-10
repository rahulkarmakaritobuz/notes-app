import * as noteModel from "./noteModel.js";
import { Router } from "express";
import express from "express";
import cors from "cors";

const noteRouter = Router();
const app = express();
app.use(cors());

noteRouter.post("/add-note", async (req, res, next) => {
  try {
    const noteData = await noteModel.Note({
      heading: req.body.heading,
      content: req.body.content,
      dateAndTime: new Date().toLocaleString(),
    });
    const response = await noteData.save();
    res.status(200).send({
      data: response,
      message: "Note created",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: "Failed to create note",
      success: false,
    });
  }
});

noteRouter.get("/get-note/:id", async (req, res) => {
  const noteData = await noteModel.Note.find({ _id: req.params.id });
  try {
    res.status(200).send({
      data: noteData,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: error,
      message: "No Note found!",
      success: false,
    });
  }
});

noteRouter.get("/get-note", async (req, res) => {
  const noteData = await noteModel.Note.find({});
  try {
    res.status(200).send({
      data: noteData,
      message: "Success",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: error,
      message: "No note found",
      success: false,
    });
  }
});

noteRouter.put("/note/:id", async (req, res) => {
  console.log(req.body);
  try {
    const noteData = await noteModel.Note.findByIdAndUpdate(req.params.id, {
      heading: req.body.heading,
      content: req.body.content,
      dateAndTime: new Date().toLocaleString(),
    });
    const update = await noteData.save();
    res.status(200).send({
      data: update,
      message: "Note updated",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: error,
      message: "No note found!",
      success: false,
    });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  try {
    const noteData = await noteModel.Note.findByIdAndDelete(req.params.id);

    if (!noteData) res.status(404).send("No item found");
    res.status(200).send({
      data: noteData,
      message: "Note data deleted",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: error,
      message: "No note found!",
      success: false,
    });
  }
});

export default noteRouter;