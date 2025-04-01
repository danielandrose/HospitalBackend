import {model,Schema} from "mongoose"

const doctorSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    img: String,
    appointments:[{
        patientID:String,
        patientName:String,
        patientAge:Number,
        date:{
            type:Date,
            required:true,
        }
    }]
})

const Doctor=model('Doctor',doctorSchema)

export default Doctor