const express = require("express");
const commentsectionModel = require("../models/commentsectionModel");

const expressAsyncHandler = require('express-async-handler');
const {response} = require("express");
const cloudinary = require("../Config/cloudinary");



const fetchComments = expressAsyncHandler(async (req,res)=>{
   //  respond hello world
   //  res.json({message:"Hello World"});
   try{
         const {postid} = req.body;
         const comments = await commentsectionModel.findOne({postid:postid}).populate("comments.postedby");
         // return response sectionid,comments
            res.json({sectionid:comments._id,comments:comments.comments});

   }
   catch(error){
       res.status(400).json({message:error.message});
   }
});

const putcomment=expressAsyncHandler(async (req,res)=>{
        let sectionid = req.body.sectionid;
        let comment = req.body.comment;
        let postedby = req.body.postedby;
        //put comment in sectionid
        try{

            let newcomment = {
                postedby:postedby,
                text:comment,
            }
            const commentsection = await commentsectionModel.findOneAndUpdate(
                {_id:sectionid},
                {$push:{comments:newcomment}},
                {new:true}
            );
            //respond comment sent successfully
            res.json({message:"Comment sent successfully"});
        }
        catch(error){
            res.status(400).json({message:error.message});
        }


})
module.exports = {fetchComments,putcomment};