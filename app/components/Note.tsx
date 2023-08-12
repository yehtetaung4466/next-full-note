"use client"
import Link from "next/link"
import { useRouter } from "next/navigation";
export default function Note({title,body,username,id}:{title:string,body:string,id:string,username:string}){
    const route = useRouter();
    const deleteNote=async()=>{
        const response = await fetch(`/api/${username}/notes/${id}`,{
            method:"delete",
            cache:"no-store"
        })
        if(response.ok){
            // route.push(`/${username}/notes`)
            route.refresh();

        }else{
            alert("Error")
        }
        
    }
    return(
        <div  className=" overflow-auto my-2 flex items-center justify-between w-10/12 h-12 rounded-md shadow-sm max-w-lg mx-auto border border-slate-300">
            <Link href={`notes/${id}`} className=" w-11/12">
            <h1 className=" uppercase font-normal text-slate-600 text-xl ml-1">{title}</h1>

            </Link>

            <div onClick={deleteNote} className=" cursor-pointer  z-10 relative">
                <svg className=" fill-red-400 h-6" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
            </div>
        </div>
    )
}