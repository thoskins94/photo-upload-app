var User = require('../models/user');
const mongoose = require('mongoose');
const faker = require('faker');
const mongooseConfig = require('../config/database.config')

mongoose.connect(mongooseConfig);

var users = User.find();

if(users.length >)