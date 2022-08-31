const users = require("../data/users.js");

const getAllUsers = (req, res) => {
    res.send(users)
}

const addNewUser = (req, res) => {
    const newUser = {
        username: req.body.username,
        age: req.body.age,
        isAdmin: req.body.isAdmin,
        id: Math.random()
    }
    users.push(newUser)
    res.send("done")
};

const updateUser = ((req, res) => {
    let foundUser = users.filter(user => user.id === req.body.id)
    foundUser = req.body
    res.send("done")
});

const deleteUser = (req, res) => {
    users.filter(user => user.id != req.body.id)
    res.send(users.filter(user => user.id != req.body.id))
}


const getUser = (req, res) => {
    const user = users.find(user => user.id == req.params.id);
    console.log(req.params.id)
    res.json(user)
}
module.exports = { getAllUsers, addNewUser, updateUser, deleteUser, getUser }