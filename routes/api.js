const express = require("express");
const router = express.Router();
const users = require("../data/users.js");
const controllers = require("../controllers/apiControllers");
const greetings = require("../middleware/greetings.js");


// const greetings = ((req, res, next) => {
//     console.log(`Blia, kto to sdelal zapros at: ${new Date().toLocaleString()}`);
//     next();
// });


router.route('/')
    .get(controllers.getAllUsers)
    .post(greetings, controllers.addNewUser)
    .put(controllers.updateUser)
    .delete(controllers.deleteUser);

router.route('/:id')
    .get(controllers.getUser);

module.exports = router;