
import connectDb from "@/app/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { noteModel } from "@/app/model/notes";
import { Note } from "@/app/utils/type";
export async function GET(request:NextRequest,{params}:{params:{username:string}}){
    const {username}=params;
    try{
        await connectDb();
    
        }catch(err){
            console.error(err);
            return NextResponse.json("can't connect to database",{status:500});
        }
    
    try{
        const notes:Note[]=await noteModel.find({username});
        return NextResponse.json(notes);
    }catch(err){
        console.error(err);
        return NextResponse.json("Error finding Notes",{status:500})
    }
}