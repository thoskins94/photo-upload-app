const User = require('./models/user');
const Photo = require('./models/photo')
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config')

mongoose.connect(dbConfig.url, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
}).then(() => {
   console.log("Successfully Connected to Database");
}).catch((error) => {
   console.log("Could not connect to the database. Exiting now...");
   process.exit;
})

User.remove({});
Photo.remove({});

console.log("Seed Script Complete!");