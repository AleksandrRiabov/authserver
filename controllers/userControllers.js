const User = require("../model/User.js");
const ROLS_LIST = require("../config/roles.js");
const bcrypt = require('bcrypt');

//GET ALL USERS  // Access level Admin only 
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        if (!allUsers.length) return res.status(204).json([]);
        return res.status(200).json(allUsers);
    } catch (err) {
        return res.status(500).json({ "message": err.message })
    }
}

//UPDATED USER // Access level Admin only 
const updateUser = async (req, res) => {
    const { id, username, password, roles } = req.body;
    if (!id) return res.status(400).json({ "message": "User ID is required" });

    const foundUser = await User.findOne({ _id: id }).exec();
    if (!foundUser) return res.status(400).json({ "message": `No User found with ID: ${id}` });

    //Aply changes if provided values
    if (username) foundUser.username = username;
    if (password) {
        const hashedpassword = await bcrypt.hash(password, 10);
        foundUser.password = hashedpassword;
    }

    if (roles) {
        const newRoles = {}
        roles.forEach(role => newRoles[role] = ROLS_LIST[role]);
        foundUser.roles = newRoles;
    }

    const result = await foundUser.save();
    res.status(200).json({ "message": "User info has been updated>", result })
}

// DELETE USER // Access level Admin only 
const deleteUser = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ "message": "User ID is required." });
    const foundUser = await User.findOne({ _id: id }).exec();
    console.log(foundUser)
    if (!foundUser) return res.status(204).json({ "message": `No user matches the ID: ${id}` });

    await User.deleteOne({ _id: id });
    return res.status(200).json({ "message": `User ${foundUser.username} has been deleted.` })
}


// GET SINGLE USER // Access level Admin only 

const getSingleUser = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ "messge": "User ID is required" });
    const foundUser = await User.findOne({ _id: id }).exec();
    if (!foundUser) return res.status(204).json({ "message": `No user matches the ID: ${id}` });
    const { password, ...user } = foundUser._doc;
    res.status(200).json(user);
}

module.exports = { getAllUsers, updateUser, deleteUser, getSingleUser };