"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginError from "../components/LoginError";
import LoginWarning from "../components/LoginWarning";
export default function Login(){
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [error,setError]=useState<boolean>(false);
    const [warning,setWarning]=useState<boolean>(false);
    const [errorMsg,setErrorMsg]=useState<string>("");
    const [warningMsg,setWarningMsg]=useState<string>("");

    const route=useRouter();
    const login=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const response = await fetch("/api/login",{
            headers:{
                "Content-Type":"application/json"
            },
            method:"post",
            body: JSON.stringify({
                email,password
            })
         })
         const body:string = await response.json();
         if(response.ok){
            route.push(`/${body}/notes`)
         }else if(response.status!==500){
           
            setWarning(true)
            setWarningMsg(body);
           
         } else{
            setError(true);
            setErrorMsg(body)
         }
    }
    return(
        <div className=" w-screen h-screen flex items-center justify-center">
            {warning ? <LoginWarning msg={warningMsg}/>:null}
            {error ? <LoginError msg={errorMsg}/>:null}
            <form onSubmit={login} className=" form-control w-10/12 max-w-xs">
            <h1 className=" font-medium text-lg text-center text-primary">Log in</h1>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="text" id="email" name="email" className=" form-input"/>
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" id="password" name="password" className=" form-input" />
                <button className=" btn btn-primary mt-2">Log in</button>
                <div>Create a new account? 
                  <Link href="/signup" className=" text-primary hover:underline">signup</Link>
                </div>
            </form>
        </div>
    )
}