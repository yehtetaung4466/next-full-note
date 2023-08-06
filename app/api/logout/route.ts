import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    // request.cookies.delete("token");
    cookies().delete("token")
    return NextResponse.json("Logout complete")
}