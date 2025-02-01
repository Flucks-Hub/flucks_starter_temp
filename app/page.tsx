import { getServerSession } from "next-auth";
import Image from "next/image";
import { authoptions } from "./api/auth/[...nextauth]/option";
import Login from "@/components/auth/Login";


export default async function Home() {
  const session = await getServerSession(authoptions);
  console.log("session",session)
  return (
   <div className="flex h-screen w-full justify-center items-center border border-black ">
    <Login/>
    

   </div>
  );
}
