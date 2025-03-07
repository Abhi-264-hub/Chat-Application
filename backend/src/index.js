import express from "express" 
import dotenv from "dotenv" 
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import path from "path"




import { connectDB } from "./lib/db.js";
import cors from "cors"
import { app,server } from "./lib/socket.js";

dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


const PORT=process.env.PORT
const __dirname=path.resolve();


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
       res.sendFile(path.join(__dirname,"../frontend","dist","index.html")) 

    })
}

server.listen(PORT,()=>{
    console.log("Server is Running on port PORT:"+PORT);
    connectDB()
})