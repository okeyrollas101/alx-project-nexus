import { useState } from "react";

// --- Modal Forms ---
function RegisterForm({ closeModal }: { closeModal: () => void }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Registered successfully!");
      closeModal();
    } else {
      const error = await res.json();
      alert(error.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col  px-4 h-[350px]  justify-center">
      <div className="flex flex-col justify-center items-center mb-8">
      <h2 className="text-2xl font-bold text-center">Register</h2>
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
      <button type="submit" className="bg-[#F59D55] hover:bg-[#A95F21] rounded-full cursor-pointer text-white px-4 py-2 shadow-md hover:shadow-2xl transition duration-500 ease-in-out">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;