import mongoose from "mongoose"

const connectDB=async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/hosptailAppointmentBooking")
        console.log("Connected to DB...")
    }
    catch(err){
        console.log({"message":err.message})
        process.exit(1);
    }
}

export default connectDB