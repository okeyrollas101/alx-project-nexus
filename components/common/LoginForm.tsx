import { div } from "framer-motion/client";
import { useRouter } from "next/router";
import { useState } from "react";

function LoginForm({ closeModal }: { closeModal: () => void }) {
    const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [ispending, setIspending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      console.log("Logged in successfully!");
      closeModal();
    } else {
      const error = await res.json();
      alert(error.message || "Login failed");
    }
  };

  return (
    <section>
    <form onSubmit={handleSubmit} className="flex flex-col px-4 h-[350px]  justify-center">
      <div className="flex flex-col justify-center items-center mb-8">
      <h2 className="text-2xl font-bold text-center">Login</h2>
       <div className="w-10 mr-[16px] h-2 mt-1 rounded-2xl bg-[#A95F21]"></div>
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="border p-2 mb-4 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="border p-2 mb-4 rounded"
      />
      <button type="submit" className="hover:bg-[#F59D55] hover:text-white border rounded-full border-gray-300 shadow-md hover:shadow-2xl transition duration-500 ease-in-out px-4 py-2">
        {ispending ? (<div className="space-x-2">
            <div className="p-2 animate-spin border rounded-full"></div>
            <span>Logging</span>
        </div>) : "Login"}
      </button>
    </form>
     <div>
      <p className="mb-12 text-center">
        Don't have an account?{" "}
        <button
          onClick={() => router.push("/register")}
          className="text-blue-400 hover:underline"
        >
          Register here
        </button>
      </p>
        </div>
    </ section>
  );
}

export default LoginForm;