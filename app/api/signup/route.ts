

import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/app/utils/connectDb";
import { userModel } from "@/app/model/users";
import bcrypt from "bcrypt";
export  async function POST(request:NextRequest){
    try{
    await connectDb();

    }catch(err){
        console.error(err);
        return NextResponse.json("error connecting database",{status:500});
    }
    const body:{username:string,email:string,password:string} = await request.json();
    const {username,email,password}=body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt);
    try{
        const usernameIsExist:string|null = await userModel.findOne({username});
        if(usernameIsExist) return NextResponse.json("user name is taken",{status:400});
        const emailIsExist:string|null=await userModel.findOne({email});
        if(emailIsExist) return NextResponse.json("This email is registered for anoter account",{status:400});
        await userModel.create({
            username,
            email,
            password:passwordHash,
            
        })
    }catch(err){
        console.error(err);
        return NextResponse.json("error creating user",{status:500});
    }
    return NextResponse.json("created",{status:201});
}