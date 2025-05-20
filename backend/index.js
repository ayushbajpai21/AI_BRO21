import express from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import geminiResponse from "./gemini.js"


const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)



// db connection 
const connection = mongoose.connect("mongodb://localhost:27017/AIassistant");
connection.then((result) => {
    console.log("connected to database");
});connection.catch(() => {
    console.log("not connected ")
});

app.listen(port,()=>{
    console.log("server started")
})

