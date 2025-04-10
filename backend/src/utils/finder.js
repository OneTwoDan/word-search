const { searchWord } = require("./searchWord")

function findWords(words, wordSearch) {
  const found = []
  const notFound = []

  for (const word of words) {
    const exists = searchWord(word, wordSearch)
    if (exists) {
      found.push(word)
    } else {
      notFound.push(word)
    }
  }

  return { found, notFound }
}

module.exports = { findWords }
