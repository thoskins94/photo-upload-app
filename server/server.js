const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');
const routes = require('./routes/base.routes');
const photoRoutes = require('./routes/photo');

const app = express();

// Allow app to use bodyparser to handle json data manipulation api calls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set routes
app.use('/api', routes);
app.use('/photo', photoRoute)

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
const port = 8000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function() {
    console.log(`server is up and running on port ${port}`)
});