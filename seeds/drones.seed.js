// Iteration #1
const mongoose = require("mongoose");

const Drone = require("../models/Drone.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-drones";

const drones = [
  {
    name: "Stardust",
    propellers: 4,
    maxSpeed: 35,
  },
  {
    name: "Morningstar",
    propellers: 4,
    maxSpeed: 25,
  },
  {
    name: "Moonshine",
    propellers: 3,
    maxSpeed: 25,
  },
];

async function insertDrones() {
  try {
    let db = await mongoose.connect(MONGO_URI);
    console.log("Database Connected");
    let dronesCreated = await Drone.create(drones);
    console.log(`Created ${dronesCreated.length} drones`);
    await mongoose.connection.close();
    console.log("Database connection terminated");
  } catch (error) {
    console.log("Error occured: ", error);
  }
}

insertDrones();
