const mongoose = require('mongoose')
const validator = require("validator");
// const express = require("express");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
         minlength:3
    },
email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }
        
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    message: {
        type: String,
        required: true,
        minlength: 3
    },
    date: {
        type: Date,
        default: Date.now
    
    }


})
// we need a collection
const Usernew =   mongoose.model("Usernew",userSchema );

module.exports=Usernew;