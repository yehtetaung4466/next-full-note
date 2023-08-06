import connectDb from "@/app/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { noteModel } from "@/app/model/notes";


export async function POST(request:NextRequest,{params}:{params:{username:string}}){
    const {username} = params;
    try{
        await connectDb();
    
        }catch(err){
            console.error(err);
            return NextResponse.json("can't connect to database",{status:500});
        }
    const reqBody:{title:string,body:string} = await request.json();
    const {title,body}=reqBody;
    try{
        await noteModel.create({
            title,body,username
        })
        return NextResponse.json("Note created successfully",{status:201})
    }catch(err){
        console.error(err)
        return NextResponse.json("error creating note",{status:500});
    }
    
}