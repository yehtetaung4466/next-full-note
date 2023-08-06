import mongoose, { Schema,model } from "mongoose";

const userSchema=new Schema(
    {
        username :{
            type: String,
            require:true,
            unique:true,
        },
        email:{
            type:String,
            require:true,
            unique:true,
        },
        password:{
            type: String,
            require:true,
            unique:false,
        }
    }
)

export const userModel=mongoose.models.users||mongoose.model("users",userSchema);