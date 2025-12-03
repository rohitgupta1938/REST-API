const express=require("express");
const app=express();
const { v4 :uuidv4 } =require('uuid');
var methodOverride = require('method-override')
const port=8080;

let posts=[
    {
        "id":uuidv4(),
        "title": "Coding",
        "description":"This To-Do App helps users organize their daily tasks with ease"
    },
    {
        "id":uuidv4(),
        "title": "CodeWithTasks",
        "description":"A clean and simple task manager built for developers and students. Add, edit, and manage your daily work with a fast and minimal UI."
    },
    {
        "id":uuidv4(),
        "title": "DevTo-Do",
        "description":"A lightweight to-do app designed for coding beginners. Track your coding tasks, assignments, and daily goals in one place."
    }
]
app.set("view engin","ejs");

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'));

app.get("/posts",(req,res)=>{
    res.render("main.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {title,description}=req.body
    if(title && title.trim() !== ""){
        const id=uuidv4();
    posts.push({id:id,title:title,description:description});
    }
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params
    let post=posts.find((p)=> id===p.id)
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    const {id}=req.params;
    const {title,description}=req.body;
    const post=posts.find((p)=> id===p.id);
    post.title=title;
    post.description=description;
    console.log(post);
    res.redirect("/posts");
})


app.get("/posts/:id/edit",(req,res)=>{
    const {id}=req.params;
    const post=posts.find((p)=> id===p.id)
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    const {id}=req.params;
    posts=posts.filter((p)=> id !==p.id)
    console.log(posts)
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log(`${port} is listening` );
})