const express = require("express");
const router = express.Router();

const {createPost,fetchPost}=require("../Controllers/postControllers");
const {protect}=require("../middleware/authMiddleware");



router.route("/createPost").post(protect,createPost);
router.route("/fetchPost").get(fetchPost);


module.exports = router;