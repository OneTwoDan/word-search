const express = require("express")
const router = express.Router()
const { findWords } = require("../utils/finder")

router.post("/", (req, res) => {
  const { words, wordSearch } = req.body

  if (!Array.isArray(words) || !Array.isArray(wordSearch)) {
    return res
      .status(400)
      .json({ error: "Both 'words' and 'wordSearch' must be arrays" })
  }

  const result = findWords(words, wordSearch)
  res.json(result)
})

module.exports = router
