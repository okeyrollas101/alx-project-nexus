"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/common/SearchBar";
import { Menu, ShoppingCart, X, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/userSlice";
import RegisterForm from "@/components/common/RegisterForm";
import Modal from "@/components/common/Modal";
import LoginForm from "@/components/common/LoginForm";
import AuthButtons from "../header/AuthButtons";
import { headerNavlinks as navLinks } from "@/constants";
import UserCard from "../header/UserCard";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // cart items from redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // user from redux
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);

  console.log("user", user);
  // chech whether component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => router.pathname === path;

  // handle logout
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  // if is componen tmounted return null
  if (!isMounted) return null;

  return (
    <header className="flex items-center justify-between p-4 shadow-md relative">
      {/* Logo */}

      <div
        aria-label="Logo"
        className="flex space-x-3 items-center"
        role="button"
      >
        <h2 className="text-black text-2xl sm:text-3xl font-bold">
          Shoppers
        </h2>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6">
        <nav className="flex space-x-8 text-lg xl:text-2xl">
          {[...navLinks].map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`relative cursor-pointer transition-colors duration-300 
                ${
                  isActive(link.href)
                    ? "text-[#F59D55] font-bold"
                    : "text-gray-700 hover:text-[#A95F21]"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Search */}
        <SearchBar />

        {/* Auth Buttons */}
        {isLoggedIn && user ? (
          <div className="flex items-center space-x-4">
            <UserCard />
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-3">
            <AuthButtons
              openLogin={() => setLoginOpen(true)}
              openRegister={() => setRegisterOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center text-2xl space-x-6">
        {/* Cart */}
        {user?.role === "client" && (
          <div
            className="flex items-center relative cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart
              className="text-gray-500 hover:bg-[#A95F21] hover:text-white rounded-md p-2 transition duration-300"
              size={40}
            />
            {totalItems > 0 && (
              <span className="absolute top-[-2px] right-4 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="flex lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div
            aria-label="Logo"
            className="flex space-x-3 items-center"
            role="button"
            onClick={() => router.push("/")}
          >
            <h2 className="text-black text-2xl sm:text-3xl font-bold">
              Shoppers
            </h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 bg-gray-200 rounded-full hover:rotate-180 hover:text-[#A95F21] transition duration-700 ease-in-out hover:bg-gray-300"
          >
            <X size={30} />
          </button>
        </div>

        {/* Mobile Links */}
        <nav className="flex flex-col space-y-6 p-6 text-lg">
          {[...navLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-[#F59D55] font-bold"
                  : "text-gray-700 hover:text-[#A95F21]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4">
            <SearchBar />
          </div>

          {/* Auth Section */}
          {isLoggedIn ? (
            <div className="flex justify-between pl-3 pr-12">
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
            >
              Logout
            </button>
              <UserCard />
            </div>
          ) : (
            <div className="flex space-x-3">
              <AuthButtons
                openLogin={() => setLoginOpen(true)}
                openRegister={() => setRegisterOpen(true)}
              />
            </div>
          )}
        </nav>
      </div>

      <Modal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
        <RegisterForm closeModal={() => setRegisterOpen(false)} />
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <LoginForm closeModal={() => setLoginOpen(false)} />
      </Modal>
    </header>
  );
}

export default Header;