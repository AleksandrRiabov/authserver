const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents")
const { errorHandler } = require("./middleware/errorHandler")
const cors = require("cors")
const verifyJwt = require("./middleware/verifyJwt.js");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;

const apiRoutes = require("./routes/api.js");
const registerRoutes = require('./routes/register.js');
const authRoutes = require("./routes/auth.js");
const refreshRoutes = require("./routes/refresh.js");
const logoutRoutes = require("./routes/logout.js");

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(cors())
app.use(logger);
app.use(express.json());
app.use(cookieParser());


app.use("/register", registerRoutes);
app.use('/login', authRoutes);
app.use("/refresh", refreshRoutes);
app.use('/logout', logoutRoutes);


app.use(verifyJwt);
app.use("/", apiRoutes);

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        // 404 page can be added to views directory and respond with that
        res.send("Page not found")
    }
    if (req.accepts("json")) {
        res.json({ err: "404 Not Found" })
    }
})

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))