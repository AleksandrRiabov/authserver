const User = require('../model/User.js');
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "Username and password required." });
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.status(401).json({ "message": "Incorrect username or password." }) //Unauthorised
    //Evaluet password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        //create JWTs
        const accessToken = jwt.sign(
            { "UserInfo": { "username": foundUser.username, "roles": roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '120s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        //saving refresh token with current user
        try {
            foundUser.refreshToken = refreshToken;
            await foundUser.save();
            res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
            return res.status(200).json({ accessToken, roles: roles });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ "message": error }) //Could not save to DB
        }
    } else {
        return res.status(401).json({ "message": "Incorrect username or password." }) //Unauthorised
    }
}

module.exports = { handleLogin };