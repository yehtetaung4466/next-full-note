import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {decodeJwt} from "jose"

type JWT = {id:string,username:string,email:string,password:string,iat:number,exp:number}
export  function middleware(request: NextRequest) {
    // console.log("middleware run")
    const cookie = request.cookies.get("token");

    if(cookie){
    // console.log(cookie)
    // const getJwtSecrectKey=()=>{
    //   const secrect = process.env.JWT_KEY as string;

    //   if(!secrect||secrect.length===0){
    //     throw new Error("JWT key not set")
    //   }
    //   return secrect;
    // }
    // const key = {type:process.env.JWT_KEY as string};
    const token:JWT =  decodeJwt(cookie.value) as JWT;
    // console.log(token)
    // console.log(cookie)
   
    return NextResponse.redirect(new URL(`/${token.username}/notes`, request.url))

    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}