const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next); // execute the function and wait for it to finish
        } catch (error) {
            next(error); // pass the error to the next middleware
        }
    }
}

module.exports = asyncWrapper; // export the asyncWrapper function