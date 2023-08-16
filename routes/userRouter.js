const express = require('express');
const fs = require('fs');
const Note = require('../models/Note');
const mongoose = require('mongoose');
const userRouter = new express.Router();

userRouter.get('/signup',(req,res)=>{
    res.render('signup');
})

userRouter.post('/signup',(req,res)=>{
    const { name, email, password } = req.body;
    
    console.log(`Name:: ${name} Email :: ${email}  Password:: ${password}`);
    res.send('signup successfull');
})

module.exports = userRouter;