var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/secrets.config');

var User = require('../models/user');
module.exports = {

    register: async(req, res) => {
        
        // Encrypt the users password
        var hashedPassword = bcrypt.hashSync(req.body.password);
    
        // Create new user
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,  
        }, function(err, user) {
            if(err) {
                return res.status(500).send("There was a problem registering the user.");
            }
            // Create JWT
            user.access_token = jwt.sign({ id: user.id}, config.secret, { expiresIn: 86400 });
            var date = new Date();
            user.expireIn = date.setDate(date.getDate() + 1);
            user.update(user);
            user.password = ''
            res.status(200).send({auth: true, user: user });
        });
    },

    login: async(req, res) => {
        User.findOne({ email:req.body.email }, function(err, user) {
            if(err) {
                return res.status(500).send("Server Error");    
            }
            if(!user){
                return res.status(404).send("No user with that email found");
            }
            
            let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if(!isPasswordValid) {
                return res.status(401).send({ auth: false, token: null});
            }
            
            user.access_token = jwt.sign({ id: user.id}, config.secret, { expiresIn: 86400 });
            let date = new Date();
            user.expireIn = date.setDate(date.getDate()+1);
            user.update(user);
            user.password = ''
            res.status(200).send({ auth: true, user: user});
        });
    },
    
    logout: async(req, res)  => {
        res.status(200).send({ auth: false, token: null, user: user });
    }
}
