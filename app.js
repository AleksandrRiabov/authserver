const express = require("express");
const app = express();
const path = require("path");
const {logger} = require("./middleware/logEvents")
const {errorHandler} = require("./middleware/errorHandler")
const cors = require("cors")

const PORT = process.env.PORT || 3001;

const apiRoutes = require("./routes/api.js");

app.use(logger);
app.use(cors())
app.use(express.json());

app.use("/", apiRoutes);
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")){
        // 404 page can be added to views directory and respond with that
        res.send("Page not found") 
    } 
    if (req.accepts("json")){
        res.json({err: "404 Not Found"})
    }
})
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))