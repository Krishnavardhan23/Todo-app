const express = require("express");
// const mongoose = require("mongoose");
const path=require("path");
const bodyParser=require("body-parser");
// const moment=require("moment");
const connectMongodb=require("./init/mongodb");
const Todo=require("./models/Todo");
const todoRoute=require("./routes/todo");
//environment variable
const dotenv=require("dotenv");
dotenv.config();
console.log(process.env.NAME);
const PORT = 8000;
//init app
const app = express();

// const connectionUrl = "mongodb://localhost:27017/todoDb";
// //with the above line db todoDb will be created
// mongoose.connect(connectionUrl);
// // Check database connection
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to MongoDB database");
// });----all this exported from init/mongodb.js

/*Mongodb connection */
connectMongodb();

// View engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
//for joining css files for html files
app.use(bodyParser.urlencoded({extended:true}));
//to read data from form
app.use("/",todoRoute);


// const todoSchema=mongoose.Schema({
//     title:{type:String,required:true},
//     desc:String,
// },{timestamps:true});
// const Todo=mongoose.model("todo",todoSchema);
// //todo here will be collection inside database



//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
