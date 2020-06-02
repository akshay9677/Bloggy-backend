const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/myfullStack",{useUnifiedTopology: true,useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const blogRouter = require("./routes/blogs");

app.use("/blogs",blogRouter)

app.listen(port,function(){
    console.log("Server Started")
})