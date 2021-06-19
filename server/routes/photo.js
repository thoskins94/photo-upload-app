const express = require('express');
const router = express.Router();
const Photos = require("./models/photo");
const photoController = require("./controllers/PhotoController");

// get all photos
router.get("/photo", photoController.all);

// create a photo
router.post("/photo", photoController.create);

// delete a photo
router.delete("/photo/:id", photoController.delete);