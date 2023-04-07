// SKWuIg4YNTon0UMW
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  heading: {
    type: String,
    trim: true,
    require: true,
  },
  content: {
    type: String,
    validate(text) {
      if (text.length <= 0) {
        throw new Error("No text inside!");
      }
    },
  },
  dateAndTime: {
    type: String,
  },
});

export const Note = mongoose.model("Note", schema);
