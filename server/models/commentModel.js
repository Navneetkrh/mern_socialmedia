const mongoose = require("mongoose");



const commentModel = mongoose.Schema({

        postedby: {

            type: mongoose.Schema.Types.ObjectId, ref: "User",

        },
        text: {

            type: String,

        },
    },
    {timeStamp:true,},);

const Comment = mongoose.model("Comment", commentModel);
module.exports = Comment;