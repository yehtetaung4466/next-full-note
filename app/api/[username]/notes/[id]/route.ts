
import connectDb from "@/app/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { noteModel } from "@/app/model/notes";
import { Note } from "@/app/utils/type";
export async function GET(request:NextRequest,{params}:{params:{id:string,username:string}}){
    const {id}=params;
    try{
        await connectDb();
    
        }catch(err){
            console.error(err);
            return NextResponse.json("can't connect to database",{status:500});
        }
    
    try{
        const note:Note|null=await noteModel.findOne({_id:id});
        if(note){
            return NextResponse.json(note);
        }
        return NextResponse.json("Note not found",{status:404})
        

    }catch(err){
        console.error(err);
        return NextResponse.json("Error finding Note",{status:500})
    }
}

export async function DELETE(request:NextRequest,{params}:{params:{id:string,username:string}}){
    const {id,username}=params;
    try{
        await connectDb();
    
        }catch(err){
            console.error(err);
            return NextResponse.json("can't connect to database",{status:500});
        }
    
    try{
        
        await noteModel.findByIdAndDelete({_id:id})
        // return NextResponse.redirect(new URL(`/${username}/notes`,request.url))
        return NextResponse.json("ok")

    }catch(err){
        console.error(err);
        return NextResponse.json("Error deleting Note",{status:500})
    }
}

export async function PUT(request:NextRequest,{params}:{params:{id:string,username:string}}){
    const {id} = params;
    const json:{title:string,body:string} = await request.json();
    const {title,body} = json;
    try{
        await connectDb();
    
        }catch(err){
            console.error(err);
            return NextResponse.json("can't connect to database",{status:500});
        }

        try{
        
            await noteModel.findByIdAndUpdate({_id:id},{title,body})
            return NextResponse.json("Note Updated")
    
        }catch(err){
            console.error(err);
            return NextResponse.json("Error Updating Note",{status:500})
        }

}