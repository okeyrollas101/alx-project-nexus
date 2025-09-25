"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductsByCategory } from "@/redux/slices/productSlice";
import ProductCard from "@/component/product/ProductCard";

const CategoryProductPage = ({ categoryId }: { categoryId: string }) => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.length > 0 ? (
        products.map((p) => <ProductCard key={p.id} {...p} />)
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default CategoryProductPage;