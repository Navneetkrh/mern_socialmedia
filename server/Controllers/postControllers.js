const express = require("express");
const postModal = require("../models/postModel");
const expressAsyncHandler = require('express-async-handler');
const {response} = require("express");



const createPost = expressAsyncHandler(async (req, res) => {
    const {postedby,title,text,photo} = req.body;
    if (!postedby || !title || !text) {
        return res.status(400).json({message:"All fields are required"});
    }
    const post = {postedby,title,text,photo};
    //we have to get usename and profile pic from user model and send it with response
    try {
        const newPost = await postModal.create(post);
        
        // post = await post.populate("postedby");
        res.json(post);

    } catch (error) {
        res.status(400).json({message:error.message});
    }


});

const fetchPost = expressAsyncHandler(async (req, res) => {
    try {
        const posts = await postModal.find({}).populate("postedby");
        res.json(posts);
    } catch (error) {
        res.status(400).json({message:error.message});
    }

});

module.exports = {createPost,fetchPost};

