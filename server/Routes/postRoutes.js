const express = require("express");
const router = express.Router();

const {createPost,fetchPost , deletePost}=require("../Controllers/postControllers");
const {protect}=require("../middleware/authMiddleware");



router.route("/createPost").post(protect,createPost);
router.route("/fetchPost").get(fetchPost);
router.route("/deletePost/:_id").delete(protect,deletePost);

module.exports = router;