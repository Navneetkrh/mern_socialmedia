const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();


cloudinary.config({
  cloud_name:"dkqzl8erb",
  api_key: "875217753844441",
  api_secret: "0WrLDpWLYhoFm4cqlfiCSgTVoPQ",
});

module.exports=cloudinary;
