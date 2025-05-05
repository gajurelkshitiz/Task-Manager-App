const Task = require('../models/task'); 
const asyncWrapper = require('../middleware/async'); // import the asyncWrapper middleware
const { createCustomError } = require('../errors/custom-error'); // import the createCustomError function

const getAllTasks = asyncWrapper(async (req, res) => {
    
        const tasks = await Task.find({}); 
        // res.status(200).json({ tasks }); 
        // res.status(200).json({ tasks, amount: tasks.length }); // send the tasks and the number of tasks as json response
        res
        .status(200)
        .json({ status : 'success', data: { tasks, nbHits: tasks.length } }); // send the tasks and the number of tasks as json response
})



const createTask = asyncWrapper(async (req, res) => {
        const task = await Task.create(req.body); // create a new task using the request body
        res.status(201).json({ task }); // send the request body as json response
})



const getTask = asyncWrapper(async (req, res) => {

        const { id: taskID } = req.params; // destructure the id from the request parameters
        const task = await Task.findOne({_id: taskID}); // find the task with the given id
        if(!task) {
            // return next(createCustomError(`No task with id : ${taskID}`, 404)); // send a 404 error if the task is not found)
            return res.status(404).json({ msg: `No task with id : ${taskID}` }); // send a 404 error if the task is not found
        }
        res.status(200).json({ task }); // send the task as json response

})



const updateTask = asyncWrapper(async (req, res) => {

        const {id: taskID} = req.params; // destructure the id from the request parameters
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true, // return the updated task
            runValidators: true // run the validators on the updated task
        })
        if(!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404)); // send a 404 error if the task is not found)
            // return res.status(404).json({ msg: `No task with id : ${taskID}` }); // send a 404 error if the task is not found
        }
        res.status(200).json({ task }); // send the task as json response


})



const deleteTask = asyncWrapper(async (req, res) => {

        const { id: taskID } = req.params; // destructure the id from the request parameters
        const task = await Task.findOneAndDelete({_id: taskID}); // find the task with the given id and delete it
        if(!task){
            return next(createCustomError(`No task with id : ${taskID}`, 404)); // send a 404 error if the task is not found)
            // return res.status(404).json({msg: "No task with id : ${taskID}"}); // send a 404 error if the task is not found
        }
        res.status(200).json({ task }); // send the task as json response

})




module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};