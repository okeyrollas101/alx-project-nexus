"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

function RegisterForm({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, isLoggedIn ,user} = useSelector(
    (state: RootState) => state.user
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!form.email.includes("@")) {
      return alert("Please enter a valid email address");
    }
    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    const result = await dispatch(registerUser(form));



      if (registerUser.fulfilled.match(result)) {
        closeModal();
        // ✅ Redirect based on role
        if (isLoggedIn) {
          if (result.payload.user.role === "admin") {
            router.push("/dashboard");
          } else {
            // Stay on same page or optionally redirect
            router.push("/login");
          }
        }
      }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-4 lg:h-[500px] h-[350px] justify-center"
    >
      <div className="flex flex-col justify-center items-center lg:mb-12 mb-8">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <div className="w-10 h-2 mt-1 rounded-2xl bg-[#A95F21]"></div>
      </div>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        required
        className="border p-2 mb-4 rounded"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        required
        className="border p-2 mb-4 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="border p-2 mb-4 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="border p-2 mb-4 rounded"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        className="bg-[#F59D55] hover:bg-[#A95F21] rounded-full text-white px-4 py-2 shadow-md transition duration-500"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default RegisterForm;