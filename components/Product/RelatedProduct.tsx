// pages/product.tsx
import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { IProduct } from "@/models/Product";

interface ProductPageProps {
  products: IProduct[];
}

const RelatedProduct: React.FC<ProductPageProps> = ({ products }) => {
  return (
    <article className="min-h-screen lg:pt-24 px-4 py-6 lg:px-16 mt-12 bg-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Related Products</h1>
        <p className="text-xl">
          You might also like these products from the same category.
        </p>
      </header>

      <section className="px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </article>
  );
};

export default RelatedProduct;