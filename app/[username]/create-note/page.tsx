"use client"
import { useState } from "react"
import { useParams } from "next/navigation";
import Success from "@/app/components/Success";
export default function CreateNote(){

    const [title,setTitle]=useState<string>("")
    const [body,setBody]=useState<string>("");
    const [success,setSuccess]=useState<string>("");
    const params:{username:string}=useParams() as {username:string}
    

    const create=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const response = await fetch(`/api/${params.username}/create-note`,{
            headers:{
                "Content-Type":"application/json"
            },
            method:"post",
            body: JSON.stringify({
                title,body,
            })
         })
         const r_body:string=await response.json();
         if(response.ok){
            setSuccess(r_body)
            setTimeout(() => {
                setSuccess("")
            }, 4000);
         }
        }
        
         
    return(
        <form onSubmit={create} className=" mt-28 w-10/12 max-w-md mx-auto form-control">
            {success ? 
            <Success msg={success} />:null
        }
            <div className=" text-xl font-medium text-center">Create notes</div>
            <label htmlFor="title">Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} required type="text" id="title" name="title" className=" form-input"/>
            <label htmlFor="body">body</label>
            <textarea value={body} onChange={e=>setBody(e.target.value)} required name="body" id="body" className=" form-textarea"></textarea>
            <button className=" mt-2 btn btn-primary">Create</button>
        </form>
    )
}