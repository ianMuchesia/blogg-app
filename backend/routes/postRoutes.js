
const express = require("express")
const { getPosts } = require("../controllers/postController")

const router = express.Router()

router.post('/', getPosts)

module.exports = router