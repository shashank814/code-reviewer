const express = require("express")
const aiRoutes = require("./routes/ai.routes")
const cors = require("cors")

const app = express()

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://code-reviewer-frontend-alpha.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));app.use(express.json())

app.get("/", (req, res) => {
    res.send("server is running")
})

app.use("/ai", aiRoutes)

module.exports = app