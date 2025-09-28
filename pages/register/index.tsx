"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/common/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/auth/login");
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-50 border flex flex-col mx-auto w-[400px] h-[480px] lg:w-1/3 p-6 my-12 rounded-xl">
      <RegisterForm closeModal={() => router.push("/login")} />
    </div>
  );
}