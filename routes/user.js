const express = require('express');
const User = require('../models/user')
const router = express.Router();

router.get("/signin", function(req,res){
    return res.render("signin");
});

router.get("/signup", function(req,res){
    return res.render("signup");
});

router.post("/signup",async function(req,res){
    const {fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/");
});

router.post("/signin", async function (req, res) {
    const { email, password } = req.body; 
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password); 
        // console.log("Token", token);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.status(401).send(error.message);
    }
});

router.get("/logout", function(req,res){
    res.clearCookie("token").redirect("/");
})

module.exports = router;