const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//init
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("user", userSchema);
const checkLogin = require('../middlewares/checkLogin');



router.get("/", checkLogin, (req, res) => {
    res.status(200).json({
        "message" : `Welcome ${req.username}  => userId : ${req.userId}`
    })
})

module.exports = router;