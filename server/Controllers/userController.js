const express = require('express');
const UserModel = require('../models/userModel.js');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require("../Config/generateToken");
const {response} = require("express");



const loginController=expressAsyncHandler(async (req,res)=>{
        const {name,password}=req.body;
        const user = await UserModel.findOne({name:name});
        if(user && (await user.matchPassword(password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                profilePic:user.profilePic,
                isAdmin:user.isAdmin,
                token: generateToken(user._id),
            });

        }
        else {
            res.status(401);
            throw new Error("Invalid username or password");
        }
});
const registerController=expressAsyncHandler (async (req,res)=>{
    const {name,email,password,profilePic}=req.body;
    //check if all fields are filled
    if(!name || !email || !password ){
        return res.status(400).json({message:"All fields are required"});
    }

    //pre-existing user
    const userExist=await UserModel.findOne({email:email});
    if(userExist){
        return res.status(400).json({message:"User already exist"});

    }
    //username already taken
    const userNameExists=await UserModel.findOne({name:name});
    if(userNameExists){
        return res.status(400).json({message:"Username already taken"});

    }
    //create user
    const user = await UserModel.create({name,email,password,profilePic});
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profilePic:user.profilePic,
            isAdmin:user.isAdmin,
            token: generateToken(user._id),
        });
        res.json(response);
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }



}
);

const fetchAllUsersController=expressAsyncHandler(async (req,res)=>{
    const keyword=req.query.search
        ?{
            $or:[
                {name:{$regex:req.query.search, $options:"i",}},
                {email:{$regex:req.query.search, $options:"i",}},

                ],
        }
        :{};

    const users=await UserModel.find(keyword).find({
        _id:{$ne:req.user._id},
    });
    res.send(users);
}
);
module.exports={loginController,registerController,fetchAllUsersController};