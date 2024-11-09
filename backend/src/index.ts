
import app from './app'
import dotenv from 'dotenv'
import connectDb from './Config/db'
dotenv.config()
connectDb()
app.listen(process.env.PORT||3000,()=>{
    console.log("Server started successfully")
}) 