const express = require("express");

const expressAsyncHandler = require('express-async-handler');
const {response} = require("express");
const cloudinary = require("../Config/cloudinary");
const postModal = require("../models/postModel");
const commentsectionModel = require("../models/commentsectionModel");



const createPost = expressAsyncHandler(async (req, res) => {

    const {postedby,title,text,photo} = req.body;
    if (!postedby || !title || !(text || photo)) {
        return res.status(400).json({message:"All fields are required"});
    }
    const post = {postedby,title,text,photo};

    // console.log(post);

    //we have to get usename and profile pic from user model and send it with response
    try {
        // const result= await cloudinary.uploader.upload(photo,{
        //     folder:"posts",
        //     // width:500,
        //     // crop:"scale"
        // });
        // console.log(result);
        
        const newPost = await postModal.create(
            {
                postedby:postedby,
                title:title,
                text:text,
                // photo:{
                //     public_id:result.public_id,
                //     url:result.secure_url,
                // }
                photo:{
                    public_id:photo.public_id,
                    url:photo.url,

                },
            }
        );
        console.log("POSTIDS" , newPost._id);

        const newCommentSection = await commentsectionModel.create(
            {
                postid:newPost._id,
                comments:[],

            }
        );
        // post = await post.populate("postedby");
        res.json(post);

    } catch (error) {
        res.status(400).json({message:error.message});
    }


});

const fetchmypost = expressAsyncHandler(async (req, res) => {
    try {
        const posts = await postModal.find({postedby:req.params._id}).populate("postedby");
        res.json(posts);
        console.log(posts);
    } catch (error) {
        res.status(400).json({message:error.message});
    }

});

const fetchPost = expressAsyncHandler(async (req, res) => {
    try {
        const posts = await postModal.find({}).populate("postedby");
        res.json(posts);
        console.log(posts);
    } catch (error) {
        res.status(400).json({message:error.message});
    }

});

const deletePost = expressAsyncHandler(async (req, res) => {
   const post = await postModal.findByIdAndDelete(req.params._id);
   if(post){
        res.json({message :'Removed Post'})
   }
   else{
    res.status(404);
    throw new Error("deleted post");
   }
});


module.exports = {createPost,fetchPost,deletePost,fetchmypost};