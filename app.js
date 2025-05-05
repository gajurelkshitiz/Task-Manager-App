const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
// connectDB
const connectDB = require('./db/connect');
require('dotenv').config(); // load environment variables from .env file
const notFound = require('./middleware/not-found'); // import the notFound middleware
const errorHandlerMiddleware = require('./middleware/error-handler'); // import the errorHandlerMiddleware



//middleware
app.use(express.json()); // parse json data 
app.use(express.static('./public')); // serve static files from the public directory

/// routers and controllers setup
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware); // use the errorHandlerMiddleware



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
