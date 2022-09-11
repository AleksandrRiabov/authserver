const User = require("../model/User.js");
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "Username and password required." });
    //chek for dublicate usernames in db
    const dublicate = await User.findOne({ username: user }).exec();
    if (dublicate) return res.status(409).json({ "message": "Username is already taken." })

    try {
        //encrypt the password
        const hashedpassword = await bcrypt.hash(pwd, 10);
        //store new user
        const newUser = {
            username: user,
            password: hashedpassword,
        }

        const createdUser = await User.create(newUser);

        const { password, ...userResponse } = createdUser._doc;
        res.status(201).json({ "message": "New user added", user: { userResponse } })

    } catch (error) {
        return res.status(500).json({ "message": error.message })
    }

}

module.exports = { handleNewUser }