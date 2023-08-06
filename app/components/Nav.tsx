"use client"

import { useParams } from 'next/navigation'
import person from "@/public/person.svg"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function Nav(){
    const params = useParams();
    const {username}=params;
    const route = useRouter();
    const logout=async()=>{
        const response = await fetch("/api/logout",{
            method:"POST"
        })
        if(response.ok){
            route.push("/")
        }else{
            alert("error")
        }
    }
    return(
    <div className=" w-full sticky top-0 bg-white shadow-sm border-b border-b-gray-200">
        <div className="  mx-2 sm:mx-auto max-w-6xl w-full h-12 flex justify-between items-center">
            <div className=" flex items-center">
                <Link href={`/`} className=" font-medium text-lg"><span className=" text-primary font-semibold text-xl">My</span>notes
                </Link>
                <Link href={`/${username}/create-note`} className=" ml-2 md:ml-4 lg:ml-5 cursor-pointer mt-1 text-accent hover:underline">
                    +notes
                </Link>
            </div>           
            <div className=" flex items-center ">
                <div className=" flex justify-center items-center font-normal text-lg mr-1 md:mr-4">
                    <Image className=" w-5 h-6  " src={person} height={0} width={0} alt="person icon" />
                    {username}
                </div>
                <button onClick={logout} className=" mr-4 btn-sm btn btn-warning btn-outline">log out</button>
            </div>
        </div>
    </div>
    )
}