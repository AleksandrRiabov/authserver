const greetings = (req, res, next) => {
    console.log(`Happy birthday ${req.body.username}`)
    next()
}

module.exports = greetings;