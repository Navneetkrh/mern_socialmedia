const mongoose = require("mongoose");



const postModal = mongoose.Schema({

    postedby: {

        type: mongoose.Schema.Types.ObjectId, ref: "User",

    }, 
    title: {

        type: String,

        required: true,

    },
    text: {

        type: String,

        

    },
    photo: {

        public_id: {

            type: String,

           

        },
        url: {

            type: String,

           

        },
        

    },
    likes: {

        type: Number,

        required: false,
        default:0,

    },
    comments: {

        type: Number,

        required: false,
        default:0,

    },
    shares: {

        type: Number,

        required: false,
        default:0,

    },

},
{timeStamp:true,},);

const Post = mongoose.model("Post", postModal);
module.exports = Post;