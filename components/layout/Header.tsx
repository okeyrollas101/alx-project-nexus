"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/common/SearchBar";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ];

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md relative">
      {/* Logo */}
      <div aria-label="Logo" className="flex space-x-3 items-center">
        <h1 className="bg-[#A95F21] text-white text-3xl flex items-center justify-center font-medium w-10 h-10 rounded-[10px]">
          S
        </h1>
        <h2 className="text-[#A95F21] text-2xl sm:text-3xl font-bold">
          Shoppers.
        </h2>
      </div>

      {/* Desktop Navigation + Search */}
      <div className="hidden lg:flex items-center space-x-6">
        <nav className="flex space-x-8 text-lg xl:text-2xl">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`relative cursor-pointer transition-colors duration-300 
                ${
                  isActive(link.href)
                    ? "text-[#A95F21] font-bold"
                    : "text-gray-700 hover:text-[#F59D55]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[3px] w-[50%] rounded-2xl bg-[#F59D55] scale-x-0 origin-left transition-transform duration-500 ${
                    isActive(link.href)
                      ? "scale-x-100"
                      : "group-hover:scale-x-100"
                  }`}
                />
              </span>
            </Link>
          ))}
        </nav>

        {/* SearchBar always visible */}
        <SearchBar />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center text-2xl space-x-6">
        {/* Cart Icon with Item Count */}
        <div
          className="flex items-center text-2xl space-x-6 relative cursor-pointer"
          onClick={() => router.push("/cart")}
        >
          <ShoppingCart
            className="text-gray-500 hover:bg-[#F59D55] hover:text-white rounded-md p-2 transition duration-300"
            size={40}
          />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        {/* Mobile Menu Icon */}
        <button
          className="flex lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close + Logo */}
        <div className="flex justify-between items-center p-4 border-b">
          <div aria-label="Logo" className="flex space-x-3 items-center">
            <h1 className="bg-[#A95F21] text-white text-3xl flex items-center justify-center font-medium w-10 h-10 rounded-[10px]">
              S
            </h1>
            <h2 className="text-black text-2xl sm:text-3xl font-bold">
              Shoppers.
            </h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 bg-gray-200 rounded-full hover:rotate-180 hover:text-[#F59D55] transition duration-700 ease-in-out hover:bg-gray-300"
          >
            <X size={30} />
          </button>
        </div>

        {/* Mobile Nav Links + Search */}
        <nav className="flex flex-col space-y-6 p-6 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-[#A95F21] font-bold"
                  : "text-gray-700 hover:text-[#F59D55]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Search */}
          <div className="mt-4">
            <SearchBar />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;