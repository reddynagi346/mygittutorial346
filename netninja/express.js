require('dotenv').config();
const express= require("express");
const app = express();
const Blog = require("./modals/blogs")
const morgan =require('morgan')
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI;

const port =process.env.PORT || 8000
// const dbUri="mongodb+srv://nagireddy3464:3464nagi@cluster0.hgil2.mongodb.net/Mern-Chat-App";
mongoose.connect(MONGODB_URI)
.then((result)=>app.listen(port,()=>{console.log(`Mongo Db connected Successfully ${port}`);
}))
.catch((err)=>console.log(err))

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(morgan('dev'))




app.get('/',(req,res,next)=>{
 res.render('index');
 // res.setHeader("Content-Type", "text/html");
 // res.write("Hello World!! <br/>")
 // res.write(`<a href='/para'>Para Page</a>`);
 // res.end()

})
app.get("/para",(req,res)=>{
 // res.send(
 //  `<h1>This is paragraph tag</h1>
 //  <a href="/">Home Page</a>`
 // )
 res.render('about')
})
app.get("/image",(req,res)=>{
 res.send(`<div>
  <h2>This is an Image Page</h2>
  <a href='/para'>Para page</a>
  </div>`)
})
app.get("/blog/create",(req,res)=>{
// res.send("Create a New Blog here")
res.render('create')
})
app.get("/add-blog",(req,res)=>{
  const blog =new Blog({
    title:"This is a new Blog",
    snippet:"This is the content of the blog",
    body:"This is the body of the blog"
  });
  blog.save()
  .then((result)=>{
    res.send(result)
})
.catch((err)=>{
  res.send(err)
})
})
app.get("/all-blogs",(req,res)=>{
  Blog.find()
  .then((result)=>{
    res.send(result)
})
.catch((err)=>{
  console.log(err);
})
});
app.get("/single-blog",(req,res)=>{
  Blog.findById("67a9d32b6f4976031e50bb58")
  .then((result)=>{
    res.send(result)
})
.catch((err)=>{
  res.send(err)
})
})
app.get("/enrollment",(req,res)=>{
 res.render('information')
})
// app.listen(port, ()=>{
//  console.log(`server is running on port ${port}`);
// })