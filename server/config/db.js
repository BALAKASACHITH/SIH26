const mongoose = require("mongoose");
const connectDb= async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/helloDNA");
        console.log("Database Connected !!");
    } catch (error) {
        console.log("Error in connected Database : "+error.getMessage());
    }
}
connectDb();