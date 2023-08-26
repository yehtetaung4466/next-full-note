import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {decodeJwt} from "jose"

type JWT = {id:string,username:string,email:string,password:string,iat:number,exp:number}
export function middleware(request: NextRequest) {

  
  
  const r_username=request.nextUrl.pathname.split("/")[1];
    const cookie = request.cookies.get("token");

    if(cookie){
   
    const token:JWT = decodeJwt(cookie.value) as JWT;
    if(token.username!==r_username){
      if(request.nextUrl.pathname!=="/"){

      return NextResponse.redirect(new URL("/",request.url));
      }    
    }
   
    }

  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:["/",`/:username/notes`,"/:username/notes/:id"],
}