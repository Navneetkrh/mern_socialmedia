const mongoose = require("mongoose");



const messageModal = mongoose.Schema({

    sender: {

        type: mongoose.Schema.Types.ObjectId, ref: "User",

    }, reciever: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

    },

    chat: {

        type: mongoose.Schema.Types.ObjectId, ref: "Chat",

    },
},
{timeStamp:true,},);