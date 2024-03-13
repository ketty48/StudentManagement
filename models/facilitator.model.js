import { timeStamp } from "console";
import mongoose from "mongoose";
const facilitatorSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   phone:{
    type:String,
    required:true,
    },
  
    nationalId:{
        type:String,
        required:true,
        unique:true,
        length:16
    },
    courses:[
        {
            type:String,
            required:true
        }
    ],
    role:{
        type:String,
        required:true,
        enum:{
            values:["Technical Facilitator","Assistant Technical Facilitator"],
            message:"Technical Facilitator or Assistant Technical Facilitator"
        }
    }
}, {timeStamp:true}
    )
    const Facilitator = mongoose.model("facilitator", facilitatorSchema);
    export default Facilitator;