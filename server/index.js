require("dotenv").config({ path: "../.env" });
require("./config/db.js");
const express=require("express");
const cors=require("cors");
const app=express();
const auth=require("./routes/auth");
const postEdit=require("./routes/postEdit");
app.use(express.json());
const PORT = process.env.PORT;
app.use(cors());
app.use("/",auth);
app.use("/post",postEdit);
app.listen(PORT,()=>{
    console.log(`Server is Connected to Port : ${PORT}`);
});