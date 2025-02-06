setTimeout(()=>{
 console.log("in the timeout");
 clearInterval(int)
},3000)
const int=setInterval(()=>{
 console.log("In the interval");
},500)