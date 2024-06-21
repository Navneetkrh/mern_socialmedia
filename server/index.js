const express = require('express');
const dotenv = require('dotenv');
const {default: mongoose} = require('mongoose');
const userRoutes = require('./Routes/userRoutes.js');
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const commentRoutes = require("./Routes/commentRoutes");
const {notFound, errorHandler} = require("./middleware/errorMiddleware");
const postRoutes = require("./Routes/postRoutes");
// const uploadimage = require('./Config/uploadimage.js');
const cloudinary = require("./Config/cloudinary.js");
const expressAsyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const setupCronJob = require('./forRefreshing.js');

const app = express();
// app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
dotenv.config();
const cors = require('cors');
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

const MONGO_URI = process.env.MONGO_URI;

// // allow cross origin requests
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });


const apiUrl = process.env.API_URL;


setupCronJob(apiUrl);

const websiteurl = process.env.WEBSITE_URL;
setupCronJob(websiteurl);
// setupCronJob('/api');


const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDb();

app.get('/api', (req, res) => {
//    send a json response
    res.json({message: 'Hello World'});
}
)

app.get('/', (req, res) => {
    //    send a json response
        res.json({message: 'inside server running'});
    }
    )

app.post('/laxme', (req, res) => {
    res.json(req.body);
});
app.post("/uploadimage", expressAsyncHandler(async(req, res) => {
    const {photo} = req.body;
    const result= await cloudinary.uploader.upload(photo,{
        folder:"posts",
        // width:500,
        // crop:"scale"
    });
    console.log(result);
    try{
        res.json({public_id:result.public_id,
            url:result.secure_url});
    }
    catch(error){
        res.status(400).json({message:error.message});

    }
    // res.json({message:"hello",merbody:req.body});
    
    
})
);

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/feed", postRoutes);
app.use("/comment", commentRoutes);
// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 5000;
const server=app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
    pingTimeout: 60000,
});
io.on("connection", (socket) => {
    console.log("connected");
    socket.on("setup", (user) => {
        socket.join(user.data._id);
        console.log("joined", user.data._id);
        socket.emit("Connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("joined", room);

    });

    socket.on("new message", (newMessageStuatus) => {
        var chat = newMessageStuatus.chat;
        if (!chat.users) return console.log("Chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id == newMessageStuatus.sender._id) return;
            socket.in(user._id).emit("message received", newMessageStuatus);
        }
        );
    }
    );
}
);

