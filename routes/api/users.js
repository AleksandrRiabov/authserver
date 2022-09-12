const express = require("express");
const router = express.Router();
const { getAllUsers, updateUser, deleteUser, getSingleUser } = require("../../controllers/userControllers.js");
const verifyRoles = require("../../middleware/verifyRoles.js");
const ROLS_LIST = require("../../config/roles");

router.route("/")
    .get(verifyRoles(ROLS_LIST.Admin), getAllUsers)
    .put(verifyRoles(ROLS_LIST.Admin), updateUser)
    .delete(verifyRoles(ROLS_LIST.Admin), deleteUser);

router.get("/:id", verifyRoles(ROLS_LIST.Admin), getSingleUser);

module.exports = router;