import express from "express"
import doctorsRoutes from "./routes/doctors.routes.js"
import usersRoutes from './routes/users.routes.js'
import connectDB from "./lib/db.js";
import cors from "cors"

const app=express();
const PORT=5000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());

connectDB();

app.use('/doctors',doctorsRoutes);
app.use('/users',usersRoutes);

app.listen(PORT,()=>{
    console.log(`The server is running at port ${PORT}`)
})