const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
// connectDB
const connectDB = require('./db/connect');
require('dotenv').config(); // load environment variables from .env file


//middleware
app.use(express.json()); // parse json data 
app.use(express.static('./public')); // serve static files from the public directory

/// routers and controllers setup
app.use('/api/v1/tasks', tasks);




// define the port
const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI); // connect to the database
        // Start the server
        app.listen(port, () => { console.log(`Server is running on port ${port}`);});

    }
    catch (error) {
        console.log(error);
    }
}

start();
