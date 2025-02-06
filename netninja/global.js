setTimeout(()=>{
 console.log("in the timeout");
 clearInterval(int);
console.log(__dirname);
console.log(__filename);
},3000)
const int=setInterval(()=>{
 console.log("In the interval");
},500);
const people =require("./persons")
console.log(people);

const os = require("os");
console.log(os.platform());
console.log(os.homedir());
const http = require("http");
const port=process.env.PORT ||5000;
const server=http.createServer((req,res)=>{
 res.setHeader("Content-Type", "text/html");
 if(req.url==="/"){
  res.write("This is Home page");
  res.end();
 }else if(req.url==="/about"){
  res.write("This is about page");
  res.end();
 }else if(req.url==="/image"){
  res.write("Here is your Image");
  res.end();
 }else{
  res.write("404 Not Found");
  res.write(` <h1> Page is not found</h1> `)
  res.end();
 }
})
server.listen(port,()=>{
 console.log(` Server created Successfully on ${port}`);
 
})






