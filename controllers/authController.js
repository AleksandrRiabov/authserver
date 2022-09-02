const usersDB = {
    users: require("../data/users.json"),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) return res.status(400).json({ "message": "Username and password required." });

    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.status(401).json({ "message": "Incorrect username or password." }) //Unauthorised
    //Evaluet password

    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        return res.status(200).json({ 'message': `user ${user} is logged in!` })
    } else {
        return res.status(401).json({ "message": "Incorrect username or password." }) //Unauthorised
    }
}

module.exports = { handleLogin };