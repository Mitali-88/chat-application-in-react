import express from "express"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { connectDB } from "./lib/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";
import { app ,server} from "./lib/socket.js"

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,

})
)

dotenv.config();

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


server.listen(5001, () => {
    console.log("server is listening on port 5001")
    connectDB();
})