const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Post = require("../models/Post");
const checkPermission = require("../utils/checkPermission");

const cloudinary = require("cloudinary").v2;


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const getAllPosts = async (req, res) => {

  const {category } = req.query

  const QueryObject = {}
  if(category){
    QueryObject.category = category
  }
  const posts = await Post.find(QueryObject).populate({
    path: "user",
    select: "name avatar",
  });

  res.status(StatusCodes.OK).json(posts);
};

const getSinglePost = async (req, res) => {

    const {postID} = req.params

  const post = await Post.findById(postID).populate({
    path: "user",
    select: "name avatar bio phone",
  });

  if(!post){
    throw new NotFoundError(`no post found with id:${postID}`)
  }
  res.status(StatusCodes.OK).json(post);
};



const createPost = async (req, res) => {
    const { title, content, tags, category, file } = req.body;
  
   
    if (!title || !content || !category) {
      throw new BadRequestError("Please provide all values");
    }
  

 
  
    let url=""
    if(file){
      
      const result = await cloudinary.uploader.upload(file); // Assuming `avatar` contains the file data
      url = result.secure_url;
    }
    
    await Post.create({
      user:  req.user.userId,
      title, 
      content,
      image:url,
      category,
    });
  
    res.status(StatusCodes.CREATED).json({ success: true });
  };
  
const updatePost = async(req, res)=>{
    const {postID} = req.params

    const { title, content, tags, category } = req.body;


    const post = await Post.findOne({_id:postID})

    if(!post){
        throw new NotFoundError(`no post found with id:${postID}`)
      }

      
    checkPermission(req.user, post.user)

  post.title = title;
  post.content = content;
  post.tags = tags;
  post.category = category;

  // Save the updated post document
  await post.save();
    
   res.status(StatusCodes.OK).json(post);
}


const deletePost = async( req , res)=>{
    const {postID} = req.params

    const post = await Post.findById(postID)

    if(!post){
        throw new NotFoundError(`no post found with id:${postID}`)
    }

    checkPermission(req.user , post.user)

    await Post.deleteOne({_id:postID})
    res.status(StatusCodes.OK).json({success:true})
}

module.exports = { getAllPosts , getSinglePost , updatePost, createPost, deletePost};
