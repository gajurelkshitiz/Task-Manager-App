# Project Setup Overview

## **Project Setup Overview**

### **Entry Point**
- The `app.js` file initializes the Express app, connects to the database, and sets up middleware and routes.
- It uses environment variables (via `.env`) for sensitive data like the database connection string.

### **Folder Structure**
- **`controllers/`**: Contains logic for handling requests (e.g., `tasks.js` for task-related operations).
- **`middleware/`**: Contains reusable middleware, including error handling.
- **`errors/`**: Contains custom error classes for better error management.
- **`routes/`**: Defines API endpoints (e.g., `tasks.js` for task-related routes).
- **`models/`**: Defines Mongoose schemas for MongoDB collections (e.g., `task.js`).

---

## **Middleware in the Project**
Middleware functions in Express are functions that execute during the request-response cycle. They can modify the request or response objects, end the request-response cycle, or call the next middleware.

### **Middleware Used in `app.js`**
1. **`express.json()`**:
   - Parses incoming JSON payloads and makes them available in `req.body`.
   - Example:
     ```js
     app.use(express.json());
     ```

2. **Static Middleware**:
   - Serves static files (e.g., HTML, CSS, JS) from the `public` folder.
   - Example:
     ```js
     app.use(express.static('./public'));
     ```

3. **Custom Middleware**:
   - **`notFound`**: Handles requests to undefined routes.
   - **`errorHandlerMiddleware`**: Handles errors globally.

   Example usage in `app.js`:
   ```js
   const notFound = require('./middleware/not-found');
   const errorHandlerMiddleware = require('./middleware/error-handler');

   app.use(notFound);
   app.use(errorHandlerMiddleware);
   ```

---

## **Error Handling in Detail**
Error handling is implemented using a combination of:
1. **Custom Error Class** (`errors/custom-error.js`).
2. **Global Error Handler Middleware** (`middleware/error-handler.js`).

### **Custom Error Class**
The `CustomAPIError` class is used to create consistent error objects.

**Code Example**:
```js
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};

module.exports = { CustomAPIError, createCustomError };
```

- **Purpose**:
  - Encapsulates error details (message and status code).
  - Makes it easier to create and handle errors consistently.

- **Usage Example**:
  ```js
  const { createCustomError } = require('../errors/custom-error');

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  ```

### **Global Error Handler Middleware**
The `errorHandlerMiddleware` handles all errors in one place.

**Code Example**:
```js
const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  else {
    return res.status(500).json({ msg: 'Something went wrong, please try again' });
  }
};

module.exports = errorHandlerMiddleware;
```

- **How It Works**:
  - Checks if the error is an instance of `CustomAPIError`.
  - If yes, sends the custom error message and status code.
  - Otherwise, sends a generic 500 error message.

- **Usage in `app.js`**:
  ```js
  app.use(errorHandlerMiddleware);
  ```

### **Example Flow**
1. A route handler throws an error using `createCustomError`:
   ```js
   const { createCustomError } = require('../errors/custom-error');

   const getTask = async (req, res, next) => {
     const { id: taskID } = req.params;
     const task = await Task.findOne({ _id: taskID });
     if (!task) {
       return next(createCustomError(`No task with id: ${taskID}`, 404));
     }
     res.status(200).json({ task });
   };
   ```

2. The error is passed to `next()` and caught by `errorHandlerMiddleware`.

3. The middleware sends a structured error response:
   ```json
   {
     "msg": "No task with id: 12345"
   }
   ```

---

## **Key Benefits of This Setup**
1. **Separation of Concerns**:
   - Controllers handle business logic.
   - Middleware handles errors and other reusable logic.

2. **Reusability**:
   - The `CustomAPIError` class and `errorHandlerMiddleware` can be reused across the app.

3. **Scalability**:
   - Adding new error types or middleware is straightforward.