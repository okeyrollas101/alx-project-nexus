"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/userSlice";
import { User } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ use next/navigation
import { useState, useRef, useEffect } from "react";

export default function UserCard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    router.refresh(); // 🔥 force refresh so app clears user data
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar / button */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer placeholder border border-gray-300 rounded-full"
      >
          <div title="User" className="bg-gray-300 text-[#A95F21] transition duration-700 ease-in-out hover:animate-pulse flex items-center justify-center text-2xl font-bold w-10 h-10 rounded-full">
            {user?.email ? user.email.charAt(0).toUpperCase() : <User size={20} />}
          </div>
      </div>

      {/* Dropdown content */}
      {open && (
        <ul className="absolute right-0 mt-2 menu text-[12px] bg-gray-50 rounded-b-lg shadow-md w-56 p-3 space-y-2 z-50">
          <li className="border-b pb-2 border-gray-300">
            <div>
              <p className="font-semibold ">{user?.email}</p>
              <p className=" text-gray-500">{user?.role}</p>
            </div>
          </li>
          <li>
            <button className="w-full text-left hover:bg-gray-100">Profile</button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-500 hover:bg-red-50"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}