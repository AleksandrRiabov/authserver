const User = require("../model/User.js");

const handleLogout = async (req, res) => {
    // on client, also delete access token
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(205);//No content to send back
    const refreshToken = cookies.jwt;
    //Is refreshToken in DB?
    const foundUser = User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true });
        return res.sendStatus(204);
    }
    // Delete refreshToken
    await User.updateOne({ refreshToken }, { $set: { refreshToken: "" } });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204)
}

module.exports = { handleLogout }