# Task Manager

## Overview
The Task Manager is a web application designed to help users manage their to-do lists effectively. It allows users to create, read, update, and delete tasks. The application is built using Node.js, Express.js, and MongoDB, providing a robust backend for handling task management operations.

## Features
- **Create Tasks**: Add new tasks to your to-do list.
- **View Tasks**: View all tasks in your list.
- **Edit Tasks**: Update task details, including marking them as completed.
- **Delete Tasks**: Remove tasks from your list.
- **Responsive UI**: A user-friendly interface for managing tasks.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript (Axios for API calls)
- **Environment Variables**: dotenv

## Project Structure
```
Task Manager/
├── app.js                # Main application file
├── controllers/          # Contains logic for handling API requests
│   └── tasks.js
├── db/                   # Database connection setup
│   └── connect.js
├── models/               # Mongoose schema for tasks
│   └── task.js
├── public/               # Static files (HTML, CSS, JS)
│   ├── browser-app.js
│   ├── edit-task.js
│   ├── index.html
│   ├── main.css
│   └── task.html
├── routes/               # API routes
│   └── tasks.js
├── .env                  # Environment variables
├── .gitignore            # Files to ignore in Git
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Task\ Manager/
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the `.env` file with your MongoDB connection string:
   ```env
   MONGO_URI='mongodb://localhost:27017/'
   ```

## Usage
1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints
- **GET /api/v1/tasks**: Retrieve all tasks.
- **POST /api/v1/tasks**: Create a new task.
- **GET /api/v1/tasks/:id**: Retrieve a single task by ID.
- **PATCH /api/v1/tasks/:id**: Update a task by ID.
- **DELETE /api/v1/tasks/:id**: Delete a task by ID.

## License
This project is licensed under the ISC License.

## Author
Kshitiz Gajurel