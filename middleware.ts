import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {decodeJwt} from "jose"

type JWT = {id:string,username:string,email:string,password:string,iat:number,exp:number}
export  function middleware(request: NextRequest) {
    const cookie = request.cookies.get("token");

    if(cookie){
   
    const token:JWT =  decodeJwt(cookie.value) as JWT;
   
    return NextResponse.redirect(new URL(`/${token.username}/notes`, request.url))

    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:"/",
}