const express = require('express');
const router = express.Router();
const Photos = require("./models/photo");

router.get('/', function(req, res) {
    res.send('Api Works!');
});

module.exports = router;