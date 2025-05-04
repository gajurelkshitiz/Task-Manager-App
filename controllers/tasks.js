const task = require('../models/task');
const Task = require('../models/task'); 


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}); 
        // res.status(200).json({ tasks }); 
        // res.status(200).json({ tasks, amount: tasks.length }); // send the tasks and the number of tasks as json response

        res
        .status(200)
        .json({ status : 'success', data: { tasks, nbHits: tasks.length } }); // send the tasks and the number of tasks as json response
    }
    catch (error) {
        res.status(500).json({ msg: error }); // send the error message as json response
    }

}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body); // create a new task using the request body
        res.status(201).json({ task }); // send the request body as json response
    }
    catch (error) {
        res.status(500).json({ msg: error }); // send the error message as json response
    }
}

const getTask = async (req, res) => {
    try{
        const { id: taskID } = req.params; // destructure the id from the request parameters
        const task = await Task.findOne({_id: taskID}); // find the task with the given id
        if(!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` }); // send a 404 error if the task is not found
        }
        res.status(200).json({ task }); // send the task as json response
    }
    catch (error) {
        res.status(500).json({ msg: error }); // send the error message as json response
    }
}

const updateTask = async (req, res) => {
    try {
        const {id: taskID} = req.params; // destructure the id from the request parameters
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true, // return the updated task
            runValidators: true // run the validators on the updated task
        })
        if(!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` }); // send a 404 error if the task is not found
        }
        res.status(200).json({ task }); // send the task as json response

    }
    catch (error) {
        res.status(500).json({ msg: error }); // send the error message as json response
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params; // destructure the id from the request parameters
        const task = await Task.findOneAndDelete({_id: taskID}); // find the task with the given id and delete it
        if(!task){
            return res.status(404).json({msg: "No task with id : ${taskID}"}); // send a 404 error if the task is not found
        }
        res.status(200).json({ task }); // send the task as json response
    }
    catch (error) {
        res.status(500).json({ msg: error }); // send the error message as json response
    }
}




module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};