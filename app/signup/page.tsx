"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginWarning from "../components/LoginWarning";
import LoginError from "../components/LoginError";
export default  function SignupPage(){
    const [username,setUsername]=useState<string>("");
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const route=useRouter();
    const [error,setError]=useState<boolean>(false);
    const [warning,setWarning]=useState<boolean>(false);
    const [errorMsg,setErrorMsg]=useState<string>("");
    const [warningMsg,setWarningMsg]=useState<string>("");

    const signup=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
         const response = await fetch("/api/signup",{
            headers:{
                "Content-Type":"application/json"
            },
            method:"post",
            body: JSON.stringify({
                username,email,password
            }),
         })
         const body:string = await response.json();

         if(response.ok){
            route.push("/login")
         }else if(response.status!==500){
            setWarning(true);
            setWarningMsg(body)
         }else{
            setError(true);
            setErrorMsg(body);
         }


    }
    return(
        <div className=" w-screen h-screen flex items-center justify-center">
            {warning ? <LoginWarning msg={warningMsg}/>:null}
            {error ? <LoginError msg={errorMsg}/>:null}
            <form onSubmit={signup} className=" mt-1 form-control w-10/12 max-w-xs">
                <h1 className=" font-medium text-lg text-center text-primary">Sign Up</h1>
                <label htmlFor="username">username</label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} required type="text" id="username" name="username" className=" form-input"/>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="text" id="email" name="email" className=" form-input"/>
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" id="password" name="password" className=" form-input" />
                <button className=" btn btn-primary mt-2">Sign up</button>
                <div>Already have account? 
                   <Link href="/login" className=" text-primary hover:underline">Login</Link>
                </div>
            </form>
        </div>
    )
}