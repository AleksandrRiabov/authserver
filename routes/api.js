const express = require("express");
const router = express.Router();
const controllers = require("../controllers/apiControllers");
const greetings = require("../middleware/greetings.js");

router.route('/')
    .get(controllers.getAllUsers)
    .post(greetings, controllers.addNewUser)
    .put(controllers.updateUser)
    .delete(controllers.deleteUser);

router.route('/:id')
    .get(controllers.getUser);

module.exports = router;