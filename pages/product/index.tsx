// pages/product.tsx
import React from "react";
import { GetServerSideProps } from "next";
import ProductCard from "@/components/product/ProductCard";
import { IProduct } from "@/models/Product";
import { ICategoryProps } from "@/types";

interface ProductPageProps {
  products: IProduct[];
}

const Product: React.FC<ProductPageProps> = ({ products }) => {

  return (
    <article className="min-h-screen lg:pt-24 px-4 py-6 lg:px-16 mt-12 bg-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Featured Products</h1>
        <p className="text-xl">
          Discover our handpicked selection of premium products that our
          customers love most.
        </p>
      </header>

      <section className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </article>
  );
};

export default Product;


export const getServerSideProps: GetServerSideProps = async () => {
  const productRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  const products: IProduct[] = await productRes.json();

  const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
  const categories = await categoryRes.json();

  // Map _id to id for React props
  const productCategory: ICategoryProps[] = categories.map((cat : ICategoryProps ) => ({
    id: String(cat.id),
    name: cat.name,
    image: cat.image,
    description: cat.description,
  }));

  return {
    props: { products, productCategory },
  };
};