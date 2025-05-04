const mongoose = require('mongoose');


const connectDB = (url) => {
    return mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));
}


module.exports = connectDB;