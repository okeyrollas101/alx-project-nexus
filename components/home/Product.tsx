// pages/product.tsx
import React from "react";
import { GetServerSideProps } from "next";
import ProductCard from "@/components/product/ProductCard";
import ButtonWithOutIcon from "@/components/common/button/ButtonWithOutIcon";
import { useRouter } from "next/router";
import { IProduct } from "@/models/Product";

interface ProductPageProps {
  products: IProduct[];
}

const Product: React.FC<ProductPageProps> = ({ products }) => {
  const router = useRouter();
  return (
    <article className="min-h-screen lg:pt-24 px-4 py-6 lg:px-16 mt-12 bg-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Featured Products</h1>
        <p className="text-xl">
          Explore our curated collection of premium products loved by our customers.
        </p>
      </header>

      <section className="px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <section className="flex py-[60px] items-center justify-center">
        <ButtonWithOutIcon
          label="View All Products"
          onClick={() =>
            router.push({
              pathname: "/product",
            })
          }
        />
      </section>
    </article>
  );
};

export default Product;