import Link from "next/link"
export default function Home() {
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className=" w-72">
        <h1 className=" text-2xl font-semibold">Welcome to <span className=" text-primary">My</span>notes</h1>
        <p className=" my-2 font-normal text-lg"><span className=" text-primary font-medium text-xl">My</span>notes is the world most advanced easy to use cutting edge secure ultimately powerful next level note taking app.</p>
         <div className=" w-full gap-1 flex">
          <Link href="/signup" className="btn btn-primary w-1/2">sign up</Link>
          <Link href="/login" className=" btn border-accent hover:border-accent w-1/2 text-accent">log in</Link>
        </div>
      </div>
    </div>
  )
}
