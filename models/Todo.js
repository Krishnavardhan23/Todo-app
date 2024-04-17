const mongoose=require("mongoose");
const moment=require("moment");
const todoSchema=mongoose.Schema({
        title:{type:String,required:true},
        desc:String,
    },{timestamps:true});
    const Todo=mongoose.model("todo",todoSchema);
module.exports=Todo;