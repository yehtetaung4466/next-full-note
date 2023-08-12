"use client"

import {useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Note } from "@/app/utils/type";
export default function NoteDatail({params}:{params:{id:string,username:string}}){
    const u_params=useParams();
    const {id,username} = params;
    const [title,setTitle]=useState<string>("");
    const [body,setBody]=useState<string>("");
    
    const [disable,setDisable]=useState<boolean>(true);
    const [edit,setEdit]=useState<boolean>(false);
    const handleEdit=()=>{setDisable(false);setEdit(true);};

    useEffect(()=>{
        const getNote=async()=>{
            const res = await fetch(`/api/${username}/notes/${id}`);
            const body:Note = await res.json();
            setTitle(body.title);
            setBody(body.body)
        }
        getNote()
    },[])
    const ok = async()=>{
        const response = await fetch(`/api/${username}/notes/${id}`,{
            method:"PUT",
            body:JSON.stringify({title,body})
        })
        if(!response.ok){
            alert("Update failed")
        }

    }
    return(
        <div className=" w-10/12  mx-auto">
            <a href={`/`} className=" absolute top-16 left-26 rounded-full w-6 h-6 border shadow-md flex items-center justify-center hover:w-7 hover:h-7 cursor-pointer">
                &larr;
            </a>
            <input disabled={disable} type="text" onChange={
                (e)=>{
                    // ok();
                    setTitle(e.target.value)
                }

            } value={title} className={` rounded-md mb-1 uppercase text-xl font-medium ${disable ? "border-none":"border-blue-600 border"}`} />
            <textarea value={body} onChange={(e)=>{
                // ok()
                setBody(e.target.value)

            }}  disabled={disable} className={` rounded-md overflow-auto ${disable ? " border-gray-300":"border-blue-600"} focus:border-none focus:outline-none 
              h-96 block w-full text-gray-700`}>
            </textarea>
            
           {edit&&disable===false ? <div className=" flex gap-1">
                <button onClick={()=>{setDisable(true);setEdit(false);ok()}}  className=" btn btn-primary btn-sm mt-1">Ok</button>
            </div>:<button onClick={handleEdit} className=" btn btn-info btn-sm mt-1">Edit</button>}

        </div>
    )
}