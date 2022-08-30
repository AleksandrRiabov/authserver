const express = require("express");
const app = express();
const path = require("path");
const {logger} = require("./middleware/logEvents")
const cors = require("cors")

const PORT = process.env.PORT || 3000;

const apiRoutes = require("./routes/api.js");

app.use(logger);
app.use(cors())
app.use(express.json());


app.use("/", apiRoutes);


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))