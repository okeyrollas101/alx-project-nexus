"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateProduct } from "@/redux/slices/productSlice";
import { IProduct } from "@/models/Product";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id || "";

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  const [product, setProduct] = useState<IProduct | null>(null);
  const [formData, setFormData] = useState<any>({
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

  useEffect(() => {
    const existingProduct = products.find(
      (p) => p.id === productId || p._id === productId
    );
    if (existingProduct) {
      setProduct(existingProduct as IProduct);
      setFormData({
        name: existingProduct.name || "",
        description: existingProduct.description || "",
        price: existingProduct.price || "",
        categoryId: existingProduct.categoryId || "",
        rating: existingProduct.rating || "",
        reviewsCount: existingProduct.reviewsCount || "",
        discount: existingProduct.discount || "",
        hasDiscount: existingProduct.hasDiscount || false,
        image: null,
      });
    }
  }, [productId, products]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "image") {
      const input = e.target as HTMLInputElement;
      setFormData({ ...formData, image: input.files?.[0] });
    } else if (e.target.name === "hasDiscount") {
      setFormData({
        ...formData,
        hasDiscount: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== undefined && value !== null) {
        data.append(key, value instanceof File ? value : String(value));
      }
    });
    data.append("id", String(productId));

    try {
      await dispatch(updateProduct({ id: productId, formData }));
      router.push("/dashboard/product");
    } catch (error) {
      console.error("Update product error:", error);
    }
  };

  if (!product) return <p className="p-6 text-center">Loading product...</p>;

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-inner"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Product Name
          </label>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Price
            </label>
            <input
              name="price"
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Category ID
            </label>
            <input
              name="categoryId"
              placeholder="Category ID"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Rating, Reviews, Discount, Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Rating
            </label>
            <input
              name="rating"
              placeholder="Rating"
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Reviews Count
            </label>
            <input
              name="reviewsCount"
              placeholder="Reviews Count"
              type="number"
              value={formData.reviewsCount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              name="discount"
              placeholder="Discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center mt-6">
            <label className="mr-2 font-medium text-gray-700">
              Has Discount
            </label>
            <input
              type="checkbox"
              name="hasDiscount"
              checked={formData.hasDiscount}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Product Image
          </label>
          <input
            name="image"
            type="file"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Product
          </button>
        </div>
      </form>
    </section>
  );
}