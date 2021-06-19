var User = require('../models/user');
const mongoose = require('mongoose');
const mongooseConfig = require('../config/database.config')

mongoose.connect(mongooseConfig);

var users = User.find();

if(users.length === 0) {
   User.create({
    firstName: "Jon",
    lastName: "Doe",
    email: "photo-upload@testemail.com",
    password: "testing",
   }, function() {
      console.log("Test User Added!")
   }) 
}
mongoose.connection.close();
console.log("Test Data Added!");