const Employee = require("../model/Employee.js");


const getAllEmployees = async (req, res) => {
    try {
        const allEmployees = await Employee.find();
        if (!allEmployees.length) return res.status(204).json({ "message": "No employees found" })
        return res.status(200).json(allEmployees);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": err.message });
    }
}

const addNewEmployee = async (req, res) => {
    const { firstname, lastname, age } = req.body;
    if (!firstname || !lastname) {
        return res.status(400).json({ message: "Firstname and lastname are required." });
    }
    const newEmployee = {
        firstname,
        lastname,
        age
    }
    try {
        const result = await Employee.create(newEmployee);
        return res.status(201).json({ message: "New employee added", employee: result._doc })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": err.mesaage })
    }
};

const updateEmployee = async (req, res) => {
    const { firstname, lastname, age, id } = req.body;
    if (!id) return res.status(400).json({ "message": "Id is required" })

    const foundUser = await Employee.findOne({ _id: id }).exec();
    if (!foundUser) {
        return res.status(205).json({ "mesaage": `No employees matches the ID: ${id}` });
    }

    if (firstname) foundUser.firstname = firstname;
    if (lastname) foundUser.lastname = lastname;
    if (age) foundUser.age = age;

    const result = await foundUser.save();

    res.status(201).json({ "message": "User updated", result })
};

const deleteEmployee = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ "message": "ID is required" });
    await Employee.deleteOne({ _id: id });
    res.status(200).json({ "message": "Employee removed" })
}


const getEmployee = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ "message": "Id is required" });

    try {
        const employee = await Employee.findOne({_id: id}).exec();
        if (!employee) return res.status(204).json({"message": `No employees matches the ID: ${id}` })
        res.json(employee);
    }catch(err){
        console.error(err);
        res.status(500).json({"message": err.message})
    }
    
}
module.exports = { getAllEmployees, addNewEmployee, updateEmployee  , deleteEmployee, getEmployee }