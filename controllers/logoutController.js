const usersDB = {
    users: require("../data/users.json"),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require("fs").promises;
const path = require("path");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogout = async (req, res) => {
    // on client, also delete access token
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(205);//No content to send back
    const refreshToken = cookies.jwt;
    //Is refreshToken in DB?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true });
        console.log("===========2")
        return res.sendStatus(204);
    }
    // Delete refreshToken
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: "" }
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, "..", "data", "users.json"),
        JSON.stringify(usersDB.users)
    );
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    console.log("============3")
    return res.sendStatus(204)
}

module.exports = { handleLogout }