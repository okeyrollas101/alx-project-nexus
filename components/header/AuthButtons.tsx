"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

export default function AuthButtons({ openLogin, openRegister }: { openLogin: () => void, openRegister: () => void }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // ✅ Prevent hydration mismatch

  if (isLoggedIn && user) {
    return (
      <div className="flex items-center space-x-4">
        <p className="capitalize">{user.firstName || "guest"}</p>
        <button
          onClick={() => {
            dispatch(logout());
            router.push("/");
          }}
          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={openRegister}
        className="bg-[#F59D55] hover:bg-[#A95F21] text-white px-4 py-2 rounded"
      >
        Register
      </button>
      <button
        onClick={openLogin}
        className="border-gray-300 border hover:text-white hover:bg-[#A95F21] px-4 py-2 rounded"
      >
        Login
      </button>
    </>
  );
}