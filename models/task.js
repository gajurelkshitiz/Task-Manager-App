const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']
    },
    completed : {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema); 
// The above line of code creates a model named 'Task' using the TaskSchema and exports it.
// This model can be used to interact with the 'tasks' collection in the MongoDB database.

