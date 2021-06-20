var User = require('./models/user');
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

User.create({
   firstName: "Jon",
   lastName: "Doe",
   email: "photo-upload@testemail.com",
   password: "testing",
}, function() {
   console.log("Test User Added!")
}) 
mongoose.connection.close();
console.log("Seed Script Complete!");