"use client";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/common/LoginForm";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";


export default function LoginPage() {
  const router = useRouter();
  const [isloading , setloading] = useState<boolean>(false)

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-50  flex flex-col mx-auto w-[350px]  md:w-[400px] h-[480px] lg:h-[580px] lg:w-1/3 px-6 rounded-xl my-12 border" aria-label="Login section">
      <LoginForm closeModal={() => router.push("/")} />
        <div className="mb-12 ml-4 text-center flex space-x-3">
        Don't have an account?{" "}
        <button
          onClick={() => router.push("/register")}
          className="text-blue-400 hover:underline flex ml-2"
        >
          Register here
          {isloading ? 
          <LoaderCircle color="green" size={24} className="animate-spin ml-2"/> : ""
          }
        </button>
      </div>
    </div>
  );
}