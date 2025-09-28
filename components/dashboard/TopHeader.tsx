"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopHeader() {
  const router = useRouter();

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<string[] | null>([]);

  useEffect(() => {
    const res = fetch("/api/user");

    const userData = res.then((response) => response.json());

    console.log("Userdata",userData);

    //get token fron session storage

    const token = localStorage.getItem("userEmail");

    if (token) {
      setUser([token]);
    }

    // get wishlist or oderslist and other user data

    // You can fetch user-specific data here if needed

    //handle outside click for profile dropdown


    //handle logout


    // handle update user information


    // handle dashboard analytics


    // handle dashboard charts



    // Cleanup function to remove any listeners if needed
    return () => {};

    }, []);

    //check if user is logged in
    const isLoggedIn = Boolean(user);

    if (isLoggedIn) {
        console.log("User is logged in:", user);
    } else {
        console.log("User is not logged in");
    }



  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="bg-gray-900 text-white flex justify-between items-center px-4 py-3">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <span className="font-bold text-lg">MyCatalog</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/analytics" className="hover:text-gray-300">
          Analytics
        </Link>
        {user && (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <User size={20} />
              <span>{user}</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-2">
                <Link href="/dashboard" className="block p-2 hover:bg-gray-200">
                  Dashboard
                </Link>
                <Link href="/settings" className="block p-2 hover:bg-gray-200">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left p-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        {!user && (
          <>
            <button
              onClick={() => router.push("/auth/register")}
              className="bg-blue-500 px-3 py-1 rounded"
            >
              Register
            </button>
            <button
              onClick={() => router.push("/auth/login")}
              className="bg-[#A96F21] px-3 py-1 rounded"
            >
              Login
            </button>
          </>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-gray-800 flex flex-col p-6 space-y-6 md:hidden z-50">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/analytics" className="hover:text-gray-300">
            Analytics
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link href="/settings" className="hover:text-gray-300">
                Settings
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/auth/register")}
                className="bg-blue-500 px-3 py-1 rounded"
              >
                Register
              </button>
              <button
                onClick={() => router.push("/auth/login")}
                className="bg-[#A95F21] px-3 py-1 rounded"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}