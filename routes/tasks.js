const express = require('express');
const router = express.Router();

// import the controller functions
const { 
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask } = require('../controllers/tasks');

router.route('/')
    .get(getAllTasks) // GET all tasks
    .post(createTask); // POST a new task

router.route('/:id')
    .get(getTask) // GET a single task by id
    .patch(updateTask) // PATCH a task by id
    .delete(deleteTask); // DELETE a task by id

module.exports = router