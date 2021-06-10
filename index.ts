// import app from "./server"
import  express from "express"
import cors from "cors"
import usersRouter from "./modules/usersRouter"
export const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/users",usersRouter)
app.get("/",(req,res)=>{
    res.send("welcome to backend server")
})
const PORT=process.env.PORT || 3000
export const server=app.listen(PORT,()=>{
    console.log("server listening at 3000")
})
server.on("error",console.error)
