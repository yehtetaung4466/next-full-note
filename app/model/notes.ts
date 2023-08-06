import mongoose, { Schema,model } from "mongoose";

const noteSchema=new Schema({
    title:{
        type:String,
        require:true,

    },
    body:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    }
})
export const noteModel=mongoose.models.notes||mongoose.model("notes",noteSchema);