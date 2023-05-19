
const express = require("express")
const { getTags } = require("../controllers/tagController")

const router = express.Router()

router.post('/', getTags)

module.exports = router