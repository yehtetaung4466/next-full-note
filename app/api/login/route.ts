import connectDb from "@/app/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { userModel } from "@/app/model/users";
import { User } from "@/app/utils/type";
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'
import bcrypt from "bcrypt";
export async function POST(request:NextRequest){
    try{
        await connectDb();
    
        }catch(err){
            console.error(err);
            return NextResponse.json("can't connect to database",{status:500});
        }
    const body:{email:string,password:string} = await request.json();
    const {email,password}=body;
    try{
        const user:null|User=await userModel.findOne({email});
        if(!user) return NextResponse.json("user does not exist",{status:401});
        const {username:db_username,email:db_email,password:db_password} =user;
        const isValid = await bcrypt.compare(password,db_password);
        if(isValid){
            const token=jwt.sign({
                id:user._id,
                username:user.username,
                email:user.email,
                password:user.password,
            },process.env.JWT_KEY as string,{expiresIn:"1d"});
            cookies().set("token",token);         
            return NextResponse.json(db_username);
        }else{
         return NextResponse.json("Incorrect password",{status:401});
        }
    }catch(err){
        console.error(err);
        return NextResponse.json("unknown Error",{status:500})
    }
}