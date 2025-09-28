"use client";

import { useState } from "react";
import SubscribeForm from "@/components/common/SubscribeForm";
import Hero from "@/components/home/Hero";
import Product from "@/components/home/Product";
import ProductCategory from "@/components/home/ProductCategory";
import { IProduct } from "@/models/Product";
import { ICategoryProps } from "@/types";
import { GetServerSideProps } from "next";
import Modal from "@/components/common/Modal";
import LoginForm from "@/components/common/LoginForm";
import RegisterForm from "@/components/common/RegisterForm";

interface HomeProps {
  products: IProduct[];
  productCategory: ICategoryProps[];
}

export default function Home({ products, productCategory }: HomeProps) {

  return (
    <section className="pt-6 bg-gray-100">

      {/* Main Homepage */}
      <Hero />
      <Product products={products} />
      <ProductCategory productCategory={productCategory} />
      <article className="bg-gray-50 py-6">
        <section className="flex flex-col items-center justify-center text-center bg-[#A95F21] rounded-md lg:py-24 py-12 lg:mx-25 mx-0">
          <h1 className="text-[35px] text-white font-bold mt-8">
            Get Exclusive Updates!
          </h1>
          <p className="text-[16px] max-w-3xl mt-2 text-gray-100">
            Sign up for our newsletter to unlock exclusive offers, product launches, and insider updates.
          </p>
          <SubscribeForm />
          <p className="text-gray-100 text-[16px] mt-6">
            Privacy guaranteed. Cancel your subscription whenever you choose.
          </p>
        </section>
      </article>
    </section>
  );
}




// --- Server Side Props ---
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const productRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
    );

    if (!productRes.ok) {
      const errorText = await productRes.text();
      console.error("Products API failed:", errorText);
      return { props: { products: [], productCategory: [] } };
    }

    const products: IProduct[] = await productRes.json();

    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
    );
    if (!categoryRes.ok) {
      const errorText = await categoryRes.text();
      console.error("Categories API failed:", errorText);
      return { props: { products, productCategory: [] } };
    }

    const productCategory: ICategoryProps[] = await categoryRes.json();

    return { props: { products, productCategory } };
  } catch (err) {
    console.error("getServerSideProps error:", err);
    return { props: { products: [], productCategory: [] } };
  }
};
