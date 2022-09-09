const express = require("express");
const router = express.Router();
const controllers = require("../controllers/apiControllers");
const greetings = require("../middleware/greetings.js");
const verifyRoles = require("../middleware/verifyRoles.js");
const ROLS_LIST = require("../config/roles")

router.route('/')
    .get(controllers.getAllUsers)
    .post(verifyRoles(ROLS_LIST.Admin, ROLS_LIST.Editor), controllers.addNewUser)
    .put(verifyRoles(ROLS_LIST.Admin, ROLS_LIST.Editor), controllers.updateUser)
    .delete(verifyRoles(ROLS_LIST.Admin), controllers.deleteUser);

router.route('/:id')
    .get(controllers.getUser);

module.exports = router;