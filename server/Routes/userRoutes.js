const express= require('express');
const Router = express.Router();
const {loginController, registerController,fetchAllUsersController} = require("../Controllers/userController");
const {protect} = require("../middleware/authMiddleware");
Router.post("/login",loginController);
Router.post("/register",registerController);
Router.get("/fetchUsers",protect,fetchAllUsersController);
module.exports = Router;