//** config 
// server
const express = require("express")
require("dotenv").config()

// routers path
const { readdirSync } = require("fs")

// middleware
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")

// database
const connectDB = require("./configs/db_mongo")

// ******************************************************
//** call
// server
const app = express()

// database
connectDB()

// middleware
app.use(bodyParser.json({limit: "20mb"}))
app.use(morgan("dev"))
app.use(cors())

// router
// EndPoint http://localhost:8000/api
readdirSync("./routes").map(r=>app.use("/api", require("./routes/" + r)))

// run server
const port = process.env.PORT
app.listen(port, () => {
  console.log("Server is runing on port " + port)
})