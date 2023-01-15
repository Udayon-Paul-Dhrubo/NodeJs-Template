const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//init
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model("user", userSchema);



router.post("/", async(req, res) => {

    try{    
        const user = await User.find({ username: req.body.username });
        if( user && user.length > 0 ){
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if( isValidPassword ) {
                //generate token
                const token = jwt.sign({
                    username : user[0].username,
                    userId : user[0]._id
                }, process.env.JWT_SECRET, {
                    expiresIn : '1h'
                });

                res.status(200).json({
                    "access_token" : token,
                    "message" : "Login Successful"
                });

            } else {
                res.status.apply(401).json({
                    "error" : "Authentication Failed!!"
                });
            }
        } else {
            res.status.apply(401).json({
                "error" : "Authentication Failed!!"
            });
        }  
        
    } catch {
        res.status(401).json({
            "error": "Authetication failed!"
        });
    }
})

module.exports = router;