const usersDB = {
    users: require("../data/users.json"),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "Username and password required." });
    //chek for dublicate usernames in db
    const dublicate = usersDB.users.find(person => person.username === user);
    console.log(dublicate)
    if (dublicate) return res.status(409).json({ "message": "Username is already taken." })

    try {
        //encrypt the password
        const hashedpassword = await bcrypt.hash(pwd, 10);
        //store new user
        const newUser = {
            username: user,
            password: hashedpassword,
            id: Math.floor(Math.random() * 100000) + 1,
            isAdmin: false
        }

        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "..", "data", "users.json"),
            JSON.stringify(usersDB.users)
        )

        res.status(201).json({ "message": "New user added", user: newUser })

    } catch (error) {
        return res.status(500).json({ "message": error.message })
    }

}

module.exports = { handleNewUser }