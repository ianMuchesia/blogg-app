
const express = require("express")
const { getComments } = require("../controllers/commentController")

const router = express.Router()

router.post('/', getComments)

module.exports = router