const express = require("express");
// const {
//     allMessages,
//     sendMessage,
// } = require("../Controllers/messageControllers");
const{
    fetchComments,putcomment
}= require("../Controllers/commentSectionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("/:chatId").get(protect, allMessages);
// router.route("/").post(protect, sendMessage);
router.route("/fetch").post(fetchComments);
router.route("/put").post(protect, putcomment);
module.exports = router;