const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;

const app = express();

app.use(express.json());

const schema = new Schema({
  location: String,
  temp: Number,
  fellsLike: {
    type: Number,
    default: 25,
  },
});

const Weather = mongoose.model("Weather", schema);

let weatherDB = [];

export const addData = (data) => {
  app.post("/addlocation", (req, res) => {
    weatherDB = new Weather(data);
    weatherDB.save().then(() => {
      console.log("Data added succesfully");
    });
  });
};

export const getdata = () => {
  app.get("/getlocation", async (req, res) => {
    const foods = await Weather.find({});
    try {
      res.send(foods);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};

export const updateData = () => {
  app.put("/location/:id", async (req, res) => {
    try {
      const place = await Weather.findByIdAndUpdate(req.params.id, req.body);
      const update = await place.save();
      res.send({
        location: update,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
};

export const deleteData = () => {
  app.delete("/delete/:id", async (req, res) => {
    try {
      const place = await Weather.findByIdAndDelete(req.params.id);

      if (!place) res.status(404).send("No item found");
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
