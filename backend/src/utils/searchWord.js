function searchWord(word, grid) {
  const rows = grid.length
  const cols = grid[0].length

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
  ]

  const upperWord = word.toUpperCase()

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [dx, dy] of directions) {
        if (checkDirection(grid, row, col, dx, dy, upperWord)) {
          return true
        }
      }
    }
  }

  return false
}

function checkDirection(grid, x, y, dx, dy, word) {
  for (let i = 0; i < word.length; i++) {
    const newX = x + dx * i
    const newY = y + dy * i

    if (
      newX < 0 ||
      newX >= grid.length ||
      newY < 0 ||
      newY >= grid[0].length ||
      grid[newX][newY].toUpperCase() !== word[i]
    ) {
      return false
    }
  }
  return true
}

module.exports = { searchWord }
