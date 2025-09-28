"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchProducts,
  deleteProduct,
} from "@/redux/slices/productSlice";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardProducts() {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Product Dashboard</h1>
       
      {/* Search and Filter Section */}

      {/* CTA to Create Product Page */}
      <div className="mb-8 flex items-center w-full lg:w-[300px]">
        <Link
          href="/dashboard/product/create"
          className="flex items-center bg-[#F59D55] text-white px-4 py-2 rounded hover:bg-[#A95F21]"
        >
          <Plus className="mr-2" />
          Create New Product
        </Link>
      </div>

      {/* Product Listings */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard {...product} />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Link
                    href={`/dashboard/product/edit/${product.id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}