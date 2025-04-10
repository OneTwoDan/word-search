const express = require("express")
const cors = require("cors")
const searchRoute = require("./routes/search")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/search", searchRoute)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
