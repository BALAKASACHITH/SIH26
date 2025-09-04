const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.get("/",(req,res)=>{
    res.send("hello how are you");
})
app.listen(2000,()=>{
    console.log("server is running");
});