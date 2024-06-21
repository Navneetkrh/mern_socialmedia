const mongoose = require("mongoose");



const commentsectionModel = mongoose.Schema({

        postid :{
            type: mongoose.Schema.Types.ObjectId, ref: "Post",

        },
        comments:[
            {

                postedby: {

                    type: mongoose.Schema.Types.ObjectId, ref: "User",

                },
                text: {

                    type: String,

                },
            },

        ]
    },
    {timeStamp:true,},);

const CommentSection = mongoose.model("CommentSection", commentsectionModel);
module.exports = CommentSection;