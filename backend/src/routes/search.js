const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {
  const { words, wordSearch } = req.body

  if (!Array.isArray(words) || !Array.isArray(wordSearch)) {
    return res
      .status(400)
      .json({ error: "Both 'words' and 'wordSearch' must be arrays" })
  }

  res.json({
    found: [],
    notFound: words,
  })
})

module.exports = router
