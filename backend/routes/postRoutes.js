
const express = require("express")
const {  getAllPosts, createPost, updatePost, deletePost, getSinglePost } = require("../controllers/postController")
const { authenticateUser } = require("../middleware/authentication")

const router = express.Router()

router.get('/', getAllPosts)
router.post('/',authenticateUser, createPost)
router.patch('/:postID',authenticateUser, updatePost)
router.delete('/:postID',authenticateUser,deletePost )
router.get('/:postID', getSinglePost)

module.exports = router