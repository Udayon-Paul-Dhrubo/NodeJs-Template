const express = require("express");
const mongoose = require("mongoose");

const connectDB = require('./config/db');

const publicHandler = require("./routes/publicHandler");
const signupHandler = require("./routes/signupHandler");
const loginHandler = require("./routes/loginHandler");

//init
const app = express();
app.use(express.json());
require("dotenv").config();

//Database Connection
connectDB(); 

//Application routes
app.use("/", publicHandler);
app.use("/signup", signupHandler);
app.use("/login", loginHandler);


//404 error Handler
app.use((req, res, next)=>{ 
    res.status(404).json({ "error" : "Requested url is not found" })
});

//default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
}  
app.use(errorHandler);


//server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app listening at port ${PORT}`);
});





