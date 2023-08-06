import Link from "next/link"
export default function Home() {
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className=" w-72">
        <h1 className=" text-2xl font-semibold">Welcome to <span className=" text-primary">My</span>notes</h1>
        <p className=" my-2 font-normal text-lg"><span className=" text-primary font-medium text-xl">My</span>notes is the world most advanced easy to use cutting edge secure ultimately powerful next level note taking app.</p>
        {true ? <div className=" w-full gap-1 flex">
          <button className=" btn btn-primary w-1/2"><Link href="signup" className="">sign up</Link></button>
          <button className=" btn border-accent hover:border-accent w-1/2"><Link href="login" className=" text-accent">log in</Link></button>
        </div>:<div className="btn btn-primary">Go to notes</div>}
      </div>
    </div>
  )
}
