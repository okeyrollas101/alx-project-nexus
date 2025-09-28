"use client";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/common/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-50 border flex flex-col mx-auto w-[350px]  md:w-[400px]  h-[480px] lg:w-1/3 p-6 my-12 rounded-xl">
      <RegisterForm closeModal={() => router.push("/login")} />
    </div>
  );
}