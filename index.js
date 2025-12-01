const express=require("express");
const app=express();

const port=8080;

let posts=[
    {
        "id":"1a",
        "title": "Coding",
        "Description":"This To-Do App helps users organize their daily tasks with ease"
    },
    {
        "id":"1aa",
        "title": "CodeWithTasks",
        "Description":"A clean and simple task manager built for developers and students. Add, edit, and manage your daily work with a fast and minimal UI."
    },
    {
        "id":"1aaa",
        "title": "DevTo-Do",
        "Description":"A lightweight to-do app designed for coding beginners. Track your coding tasks, assignments, and daily goals in one place."
    }
]
app.set("view engin","ejs");

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/posts",(req,res)=>{
    res.render("main.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {title,description}=req.body
    if(title !=="")
    posts.push({title:title,Description:description});
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params
    let post=posts.find((p)=> id===p.id)
    res.render("show.ejs",{post});
})
app.listen(port,()=>{
    console.log(`${port} is listening` );
})