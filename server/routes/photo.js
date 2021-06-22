const express = require('express');
const router = express.Router();
const photoController = require("../controllers/PhotoController");
const authHelpers = require("../helpers/authHelpers");
const multer = require('multer');
const base64Image = require('base64-img');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let reqPath = path.join(__dirname, '../');
        cb(null, reqPath + 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
    });
    
    var upload = multer({ storage: storage });


// get all photos
router.get("/", photoController.all);

// create a photo
router.post("/upload",authHelpers.VerifyToken, upload.single('image'), photoController.upload);

// delete a photo
router.delete("/delete/:id", authHelpers.VerifyToken, photoController.remove);

// get photos by user
router.get("/user/:userId", authHelpers.VerifyToken, photoController.getByUser)


module.exports = router;