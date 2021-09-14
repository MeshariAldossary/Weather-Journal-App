// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3000;

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

// Set up Routes

// GET route to return project data
app.get('/project-data', function (req, res, next) {
    res.json(projectData);
})

// POST route to update project data
app.post('/project-data', function (req, res, next) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    
    res.json({status:200, msg: "success"});
})

// Set the port that the server will listen

app.listen(PORT, () => console.log(`Starting Server...\nServer listening on PORT ${PORT}`));