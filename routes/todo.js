const express=require("express");
const router=express.Router();
const moment=require("moment");
const Todo=require("../models/Todo");

router.get("/",async(req,res,next)=>
{
    try{
        const todos=await Todo.find({}).sort({createdAt:-1});
        res.locals.abc=moment;

        res.render("index",{title:"List todo",todos});
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
})

router.get("/add-todo",(req,res,next)=>
{
    try{
        res.render("newtodo",{title:"New todo"});
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
})


router.get("/update-todo",async (req,res,next)=>
{
    try{
        const {id}=req.query;
        const todo=await Todo.findById(id);
        res.render("updatetodo",{title:"Update-todo",todo});
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
})

router.get("/delete-todo", async (req, res, next) => {
    try 
    {
        const { id } = req.query;
        if (!id) 
        {
            return res.status(400).json({ message: "Missing todo ID" });
        }
        res.render("deletetodo", { title: "Delete todo", id });
    } catch (error) 
    {
        res.status(500).json({ message: error.message });
    }
});



router.post("/add-todo",async(req,res,next)=>
{
    try
    {
        const {title,desc}=req.body;
        const newtodo=new Todo({title,desc});
        await newtodo.save();

        res.redirect('/');
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
});


router.post("/update-todo/:id",async(req,res,next)=>
{
    try
    {
        const {id}=req.params;
        const {title,desc}=req.body;
        const todo=await Todo.findById(id);
        if(!todo)
        {
            return res.status(404).json({message:"Todo not found"}); 
        }
        todo.title=title;
        todo.desc=desc;
        await todo.save();
        res.redirect("/");
    }  
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
});

router.get("/confirm-delete", async (req, res, next) => {
    try {
        const { id, confirm } = req.query;
        if (!id) {
            return res.status(400).json({ message: "Missing todo ID" });
        }
        if (confirm === "yes") {
            await Todo.findByIdAndDelete(id);
        }
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports=router;