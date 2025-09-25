import React from "react";
import ProductCategoryCard from "@/components/product/ProductCategoryCard";
import { ICategoryProps } from "@/types";

interface Props {
  productCategory: ICategoryProps[];
}

const ProductCategoryPage: React.FC<Props> = ({ productCategory }) => {
  return (
    <article className="min-h-screen lg:pt-24 px-4 py-6 lg:px-16 border-t-2 border-t-gray-100 bg-white ">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Shop by Category</h1>
        <p className="text-xl">
          Discover our handpicked selection of premium products that our customers love most.
        </p>
      </header>

      <section className="px-4 py-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {productCategory.map((category) => (
          <ProductCategoryCard key={category.id} {...category} />
        ))}
      </section>
    </article>
  );
};

export default ProductCategoryPage;