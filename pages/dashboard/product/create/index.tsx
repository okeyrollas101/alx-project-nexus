"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/models/Product";

interface createproductProps{
      name: string;
      description: string;
      price: string;
      categoryId: string;
      rating: string;
      reviewsCount: string;
      discount: string;
      hasDiscount: boolean;
      image: File | null;
}

export default function CreateProduct() {
  const router = useRouter();
  // const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<createproductProps>({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    rating: "",
    reviewsCount: "",
    discount: "",
    hasDiscount: false,
    image: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();

  const res = await fetch('/api/products', {
    method: 'POST',
    body: data,
  });
  if (!res.ok) throw new Error("Failed to create product");
  const result = (await res.json()) as IProduct & { _id: string };
  console.log("Created product:", result);
  router.push("/dashboard/product");

  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "image") {
      if (e.target instanceof HTMLInputElement) {
        setFormData({ ...formData, image: e.target.files?.[0] ?? null });
      }
    } else if (e.target.name === "hasDiscount") {
      if (e.target instanceof HTMLInputElement) {
        setFormData({ ...formData, hasDiscount: e.target.checked });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <section className="p-8 max-w-3xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Create New Product
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 grid grid-cols-1 gap-4"
      >
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          name="categoryId"
          placeholder="Category ID"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          name="rating"
          placeholder="Rating"
          type="number"
          step="0.1"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          name="reviewsCount"
          placeholder="Reviews Count"
          type="number"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          name="discount"
          placeholder="Discount"
          type="number"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="hasDiscount"
            onChange={handleChange}
            className="h-4 w-4 text-green-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">Has Discount</label>
        </div>
       
        <input
          name="image"
          type="file"
          onChange={handleChange}
          className="w-full text-gray-700"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 transition"
        >
          Create Product
        </button>
      </form>
    </section>
  );
}