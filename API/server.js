const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const app = express()
//const http = require('http').Server(app)
//const io = require('socket.io')(http)

// socket.io stuff
//io.on('connection', () => {
//  console.log('a user is connected')
// })

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

try {
  mongoose.connect(
    "mongodb+srv://dbAPI:*33Cla@CIivn@main-sb6gn.gcp.mongodb.net/WMDDev?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
} catch (error) {
  console.log(error)
}

// models
require("./models/userModel")
require("./models/groupModel")
require("./models/questionModel")

// routes
// Import routes
let apiRoutes = require("./routes/wmdRoutes")
// Use Api routes in the App
app.use("/api", apiRoutes)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    const host = server.address().address
    const port = server.address().port
  
    console.log(`PWA Break API listening at http://${host}:${port}`)
  })

module.exports = app
