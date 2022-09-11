const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/employeesControllers");
const verifyRoles = require("../../middleware/verifyRoles.js");
const ROLS_LIST = require("../../config/roles");

router.route('/')
    .get(controllers.getAllEmployees)
    .post(verifyRoles(ROLS_LIST.Admin, ROLS_LIST.Editor), controllers.addNewEmployee)
    .put(verifyRoles(ROLS_LIST.Admin, ROLS_LIST.Editor), controllers.updateEmployee)
    .delete(verifyRoles(ROLS_LIST.Admin), controllers.deleteEmployee);

router.route('/:id')
    .get(controllers.getEmployee);

module.exports = router;