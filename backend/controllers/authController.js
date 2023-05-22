const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const {createToken, attachCookiesToResponse} = require('../utils')
const cloudinary = require("cloudinary").v2;


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
const register = async(req ,res)=>{
    const {name , email , password, avatar, bio, phone } = req.body;


    if(!name ||!email ||!password){
        throw new BadRequestError("please provide all values")
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw new BadRequestError("Email is already in use")
    }

    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    /* let url = ""
    if(avatar){

        const result = await cloudinary.uploader.upload(avatar); // Assuming `avatar` contains the file data
        url = result.secure_url;

    } */
    const user = await User.create({
       name,
        email,
        password,
        role,
        avatar,
        bio,
        phone
      });

      const tokenUser = createToken(user);

      attachCookiesToResponse({res , user: tokenUser})


     res.status(StatusCodes.CREATED).json({  success:true ,user: tokenUser });

}



const login = async(req , res)=>{

    const { email, password } = req.body;

    if (!email) {
     throw new BadRequestError("please provide an email")
    }

    if (!password) {
        throw new BadRequestError("please provide password")
    }

 

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError("No account found with the email provided")
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("password and email did not match")
    }


    const tokenUser = createToken(user);

    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.CREATED).json({ success:true , user: tokenUser });

}


const logoutUser = async (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000), //expiresin one second
      });
      res.status(StatusCodes.OK).json({ success: true, msg: "user logged out!" });
}


module.exports = {register, login, logoutUser}