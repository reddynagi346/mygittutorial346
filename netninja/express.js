const express= require("express");
const app = express();
const port =process.env.PORT || 8000
const morgan =require('morgan')

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
app.get("/enrollment",(req,res)=>{
 res.render('information')
})
app.listen(port, ()=>{
 console.log(`server is running on port ${port}`);
})