const express = require("express");
const Router = express.Router();


const data = [
    {
        username: "Petr",
        age: 24, 
        id: 45646,
        isAdmin: false
    },
    {
        username: "Ptica",
        age: 28, 
        id: 4564456,
        isAdmin: true
    }
]

const greetings =  ((req, res, next) => {
    console.log(`Blia, kto to sdelal zapros at: ${new Date().toLocaleString()}`);
    next();
});


Router.get("/api", greetings, (req, res) => {
    res.send(req.headers)
})

module.exports = Router;