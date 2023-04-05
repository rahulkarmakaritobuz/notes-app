// SKWuIg4YNTon0UMW

const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { log } = require("console");
const cors = require("cors");
const Schema = mongoose.Schema;

const port = 8080;

const app = express();

app.use(express.json());
app.use(cors());

try {
  mongoose
    .connect(
      "mongodb+srv://rahulkarmakar:SKWuIg4YNTon0UMW@cluster0.lxiyhva.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("connected");
    });
} catch (err) {
  console.log(err);
}

const schema = new Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    validate(text) {
      if (text.length <= 0) {
        throw new Error("No text inside!");
      }
    },
  },
  dateAndTime: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", schema);

let TodoDB = [];

// const router = express.Router();

const data = {
  heading: "Demo Heading",
  content: " ",
};

app.post("/add-todo", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  const place = new Todo(req.body);
  console.log(req.body);
  try {
    await place.save();
    res.status(200).send(place);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.post("/add-todo", (req, res) => {
//   TodoDB = new Todo(data);
//   TodoDB.save().then(() => {
//     console.log("Data added succesfully");
//   });
// });

app.get("/get-todo", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  const place = await Todo.find({});
  try {
    res.status(200).send(place);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/todo/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  try {
    const place = await Todo.findByIdAndUpdate(req.params.id, req.body);
    const update = await place.save();
    res.status(200).send({
      location: update,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  try {
    const place = await Todo.findByIdAndDelete(req.params.id);

    if (!place) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("Server created");
});

// http
//   .createServer((req, res) => {
//     console.log(req.url);
//     if (req.url === "/add-todo") {
//       TodoDB = new Todo({
//         location: "Kolkata",
//         temp: 34,
//         fellsLike: 40,
//       });
//       console.log("TodoDB : ", TodoDB);
//       TodoDB.save().then(() => {
//         // console.log(TodoDB);
//         console.log("Data added succesfully");
//       });
//     } else if (req.url === "/get-todo") {
//       res.write(TodoDB.find({ location: "Kolkata" })).then(() => {
//         console.log("Data read successfully");
//       });
//     }
//   })
//   .listen(port, () => {
//     console.log("Server created");
//   });
