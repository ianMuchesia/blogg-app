const { StatusCodes } = require("http-status-codes");
const Post = require("../models/Post");
const { NotFoundError } = require("../errors");
const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  const { postID } = req.params;

  const post = await Post.findById(postID);

  if (!post) {
    throw new NotFoundError(`no post found with id:${postID}`);
  }

  const comments = await Comment.find({ post: postID });

  res.status(StatusCodes.OK).json({ comments });
};

const createComment = async (req, res) => {
  const { postID } = req.params;

  console.log(req.params);
  const { name, content } = req.body;
  const post = await Post.findById(postID);

  if (!post) {
    throw new NotFoundError(`no post found with id:${postID}`);
  }

  await Comment.create({
    name,
    content,
    post: post._id,
  });

  res.status(StatusCodes.CREATED).json({ success: true });
};

const updateComment = async (req, res) => {
  const { postID, commentID } = req.params;
  const { name, content } = req.body;

  const comment = await Comment.findOne({ post: postID, _id: commentID });
  if (!comment) {
    throw new NotFoundError(
      `no comment found with id: ${commentID} on post with id:${postID} `
    );
  }

  comment.name = name;
  comment.content = content;

  await comment.save();
  
  res.status(StatusCodes.CREATED).json({ success: true });
};

const deleteComment = async (req, res) => {
  const { postID, commentID } = req.params;

  const comment = await Comment.findOne({ post: postID, _id: commentID });
  if (!comment) {
    throw new NotFoundError(
      `no comment found with id: ${commentID} on post with id:${postID} `
    );
  }
  await Comment.deleteOne({
    _id: commentID,
  });
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = { getComments, createComment, updateComment, deleteComment };
