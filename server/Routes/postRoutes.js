const express = require("express");
const router = express.Router();

const {createPost,fetchPost , deletePost ,fetchmypost}=require("../Controllers/postControllers");
const {protect}=require("../middleware/authMiddleware");



router.route("/createPost").post(protect,createPost);
router.route("/fetchPost").get(fetchPost);
router.route("/deletePost/:_id").delete(protect,deletePost);
router.route("/mypost/:_id").get(protect,fetchmypost);

module.exports = router;