
const express = require("express")
const { getComments, createComment, updateComment, deleteComment } = require("../controllers/commentController")
const { authenticateUser, authorizePermission } = require("../middleware/authentication")

const router = express.Router()

router.get('/:postID', getComments)
router.post('/:postID', createComment )
router.patch('/:postID/:commentID',authenticateUser,authorizePermission('admin'), updateComment)
router.delete('/:postID/:commentID',authenticateUser,authorizePermission('admin'), deleteComment)
module.exports = router