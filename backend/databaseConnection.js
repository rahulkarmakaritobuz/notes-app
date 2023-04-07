import mongoose from "mongoose";
import credentials from "./config.js";

mongoose.connect(
  `mongodb+srv://${credentials.userName}:${credentials.password}@${credentials.cluster}.lxiyhva.mongodb.net/?retryWrites=true&w=majority`
);
const db = mongoose.connection;
export default db;
