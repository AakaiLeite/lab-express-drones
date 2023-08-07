const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    let allDronesFromDb = await Drone.find();
    res.render("drones/list", {drones: allDronesFromDb});
  } catch (error) {
    console.log("Error Reading the Drones: ", error);
  }
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form');
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
 try {
  const { name, propellers, maxSpeed} = req.body;
  await Drone.create({name, propellers, maxSpeed})
  res.redirect('/drones');
 }
 catch(error){
  console.log('Error Creating Drone: ', error);
  res.redirect('back');
 }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const {id } = req.params;
    let foundDrone = await Drone.findById(id);
    res.render("drones/update-form", { drone: foundDrone });
  } catch (error) {
    console.log("Error editing the Drone: ", error);
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { id } = req.params;
    const { name, propellers, maxSpeed } = req.body;
    await Drone.findByIdAndUpdate(
      id,
      { name, propellers, maxSpeed },
    );
    res.redirect("/drones");
  } catch (error) {
    console.log("Error Updating the Drone: ", error);
    res.redirect('back');
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    const { id } = req.params;
    await Drone.findByIdAndDelete(id);
    res.redirect("/drones");
  } catch (error) {
    console.log('Error Deleting Drone: ', error);
  }
});

module.exports = router;
