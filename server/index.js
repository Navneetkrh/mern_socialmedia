const express = require('express');
const dotenv = require('dotenv');
const {default: mongoose} = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const {notFound, errorHandler} = require("./middleware/errorMiddleware");
const app = express();
app.use(express.json());
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

// app.get('/api', (req, res) => {
// //    send a json response
//     res.json({message: 'Hello World'});
// }
// );

app.post('/laxme', (req, res) => {
    res.json(req.body);
});


app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

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
