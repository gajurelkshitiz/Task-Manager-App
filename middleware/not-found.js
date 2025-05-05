const notFound = (req, res) => {
    res.status(404).send('Route does not exist')
}

module.exports = notFound
// This middleware function handles 404 errors by sending a response with a status code of 404 and a message indicating that the route does not exist.
//  It is typically used as the last middleware in the stack to catch any requests that do not match defined routes.