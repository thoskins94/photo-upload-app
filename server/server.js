const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const dbConfig = require('./config/database.config');
const routes = require('./routes/base.routes');
const photoRoutes = require('./routes/photo');
const authRoutes = require('./routes/auth');

const app = express();

// Allow app to use bodyparser to handle json data manipulation api calls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/uploads', express.static('uploads'));
app.use(express.static('uploads'))
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

// Set routes
app.use('/api', routes);
app.use('/api/photo', photoRoutes);
app.use('/api/auth', authRoutes);

// Connect app to mongoDb database using mongoose
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


// Set server port
const port = 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function() {
    console.log(`server is up and running on port ${port}`)
});