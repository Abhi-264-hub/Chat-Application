import express from "express" 
import dotenv from "dotenv" 
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";

dotenv.config()
const app=express();
app.use(express.json())
app.use(cookieParser())
const PORT=process.env.PORT
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoute)

app.listen(PORT,()=>{
    console.log("Server is Running on port PORT:"+PORT);
    connectDB()
})