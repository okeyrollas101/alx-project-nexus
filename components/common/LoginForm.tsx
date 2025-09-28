"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

function LoginForm({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.user
  );

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting login form:", form);
    const result = await dispatch(loginUser(form));
     console.log("Login result:", result);
    if (loginUser.fulfilled.match(result)) {
        console.log('login sucess',result.payload)
      closeModal();

      // ✅ Redirect based on role
      if (result.payload.user.role === "admin") {
        router.push("/dashboard");
      } else {
        // Stay on same page or optionally redirect
        router.push("/");
      }
    } else {
      alert(result.payload || "Login failed");
    }
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-4 lg:h-[500px] h-[350px] justify-center"
      >
        <div className="flex flex-col justify-center items-center lg:mb-12 mb-8">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <div className="w-10 h-2 mt-1 rounded-2xl bg-[#A95F21]"></div>
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

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          className="hover:bg-[#A95F21] hover:text-white border rounded-full border-gray-300 shadow-md px-4 py-2 transition duration-500"
          disabled={loading}
        >
          {loading ? "Logging In ..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default LoginForm;