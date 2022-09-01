const data = {
    users: require("../data/users.js"), 
    setUsers : function (data){this.users = data}
}


const getAllUsers = (req, res) => {
    res.send(data.users)
}

const addNewUser = (req, res) => {
    const { username, age } = req.body;

    if (!username || !age) {
        return res.status(400).json({ message: "Username and age are required." });
    }

    const newUser = {
        username,
        age,
        isAdmin: false,
        id: Math.floor(Math.random()* 10000) + 1
    }
    data.setUsers([...data.users, newUser])
    res.status(201).json({ message: "New user created", user: newUser })
};

const updateUser = ((req, res) => {

    const {username, age, id} = req.body;

    const foundUser = data.users.find(user => user.id === parseInt(id));

    if (!foundUser) {
        return res.status(400).json({ "mesaage": "User not found." });
    }

    if (username) foundUser.username = username;
    if (age) foundUser.age = age;

    res.status(201).json({"message": "User updated", foundUser})
});

const deleteUser = (req, res) => {
    const {id} = req.body;

    const foundUser = data.users.find(user => user.id === parseInt(id));

    if (!foundUser) {
        return res.status(400).json({ "mesaage": "User not found." });
    }

    const filteredUsers = data.users.filter(user => user.id !== parseInt(id))
    data.setUsers([...filteredUsers])

    res.json({"users" :data.users})
}


const getUser = (req, res) => {
    const user = users.find(user => user.id == req.params.id);
    console.log(req.params.id)
    res.json(user)
}
module.exports = { getAllUsers, addNewUser, updateUser, deleteUser, getUser }