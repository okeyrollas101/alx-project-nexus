"use client";

import { useEffect, useState } from "react";
import SidebarNav from "@/components/dashboard/SideBar";
import { navLinks } from "@/constants";


export default function Sidebar() {

  type User  = { id: string; firstName: string; [key: string]: any };

  const [user, setUser] = useState<User | null>(null);
  const [analytics, setAnalytics] = useState<{ totalOrders: number; totalProducts: number; totalUsers: number }>({ totalOrders: 0, totalProducts: 0, totalUsers: 0 });
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (userData) {
          setUser(JSON.parse(userData));
        }

        const res = await fetch(`/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const analyticsData = await res.json();
        setAnalytics(analyticsData);

        if (userData) {
          const { id } = JSON.parse(userData);
          const ordersRes = await fetch(`/api/user/orders?userId=${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarNav navLinks={navLinks}/>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen ml-0 md:ml-64 transition-all duration-300">
        {/* Hamburger button */}
        <div className="p-4 md:hidden">
          <button
            className="text-green-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* User Analytics */}
          <section className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-bold">User Analytics</h2>
            <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
              <div className="border hover:bg-green-50 border-gray-300 p-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
                <p className="text-xl font-bold">{analytics?.totalUsers || 0}</p>
                <p className="text-gray-500 font-semibold">Users</p>
              </div>
              <div className="border hover:bg-green-50 border-gray-300 p-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
                <p className="text-xl font-bold">{analytics?.totalProducts || 0}</p>
                <p className="text-gray-500 font-semibold">Products</p>
              </div>
              <div className="border hover:bg-green-50 border-gray-300 p-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
                <p className="text-xl font-bold">{analytics?.totalOrders || 0}</p>
                <p className="text-gray-500 font-semibold">Orders</p>
              </div>
              <div className="border hover:bg-green-50 border-gray-300 p-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
                <p className="text-xl font-bold">{orders.length}</p>
                <p className="text-gray-500 font-semibold">My Orders</p>
              </div>
            </article>
          </section>

          {/* CMS Content */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold">CMS Content</h2>
            <p>Welcome back, {user?.firstName || "Guest"} 👋</p>
          </section>
        </div>
      </div>
    </div>
  );
}