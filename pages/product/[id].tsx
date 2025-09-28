import ButtonWithOutIcon from "@/components/common/button/ButtonWithOutIcon";
import StarRating from "@/components/common/StarRating";
import { IProduct } from "@/models/Product";
import { ICategoryProps } from "@/types";
import {
  ChevronLeft,
  Heart,
  HomeIcon,
  RotateCcw,
  Share2,
  Shield,
  Truck,
} from "lucide-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stats from "@/components/common/Stats";
import QuantitySelector from "@/components/common/QuantitySelector";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProduct from "@/components/product/RelatedProduct";
import { useRouter } from "next/router";
import AddToCartButton from "@/components/common/button/AddToCartButton";

interface ProductDetailPageProps {
  product: IProduct | null;
  productCategory: ICategoryProps[];
}

const ProductDetailPage = ({ product }: ProductDetailPageProps) => {
  const Router = useRouter();

  if (!product) {
    return (
      <div className="flex items-center justify-center py-28">
        Product not found
      </div>
    );
  }

  return (
    <article className="py-6 px-4 lg:px-28">
      <header>
        <div className="flex items-center flex-wrap space-y-2 space-x-4 py-4 mb-12">
          <HomeIcon color="green" />
          <Link href="/">
            <p className="text-base font-medium text-gray-900 hover:text-blue-500 hover:underline">
              Home
            </p>
          </Link>
          <span>/</span>
          <Link href="/catalog">
            <p className="text-base font-medium text-gray-900 hover:text-blue-500 hover:underline">
              Catalog
            </p>
          </Link>
          <span>/</span>
          <Link href="/catalog">
            <p className="text-base font-medium text-gray-900 hover:text-blue-500 hover:underline">
              {product.categoryId}
            </p>
          </Link>
          <span>/</span>
          <p className="text-base font-medium  text-blue-500  hover:text-blue-500 hover:underline transition-underline duration-300">
            {product.name}
          </p>
        </div>
        <button
          onClick={() => Router.push("/catalog")}
          className="flex items-center space-x-4 hover:bg-[#A95F21] text-gray-800 hover:text-gray-200 px-4 py-2 rounded-lg transition duration-800"
        >
          <ChevronLeft />
          <span>Back to Catalog</span>
        </button>
      </header>

      <section className="py-6 block lg:flex">
        <article className="w-full lg:w-1/2 mr-0 lg:mr-6">
          <figure>
            <Image
              src={product.image}
              width={800}
              height={600}
              alt={`${product.categoryId} Image`}
              className="rounded-2xl object-contain hover:scale-105 transition-scale duration-500 ease-in-out"
            />
          </figure>
          <section className="grid grid-cols-3 gap-4 py-6">
            {product.gallery?.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt={`${product.name}`}
                height={400}
                width={400}
                className="rounded-2xl h-48 hover:scale-105 transition-scale duration-500 ease-in-out"
              />
            ))}
          </section>
        </article>
        <article className="w-full lg:w-1/2 ml-0 lg:ml-6">
          <header className="flex justify-between items-center mb-10">
            <button className="bg-[#F59D55] hover:bg-[#A95F21] text-gray-100 hover:text-gray-50 transition duration-700 py-1 px-2 rounded-xl">
              {product.categoryId}
            </button>
            <div className="flex space-x-6">
              <Heart
                size={32}
                className="hover:text-[#A95F21] hover:bg-gray-300 rounded-full p-2"
              />
              <Share2
                size={32}
                className="hover:text-[#A95F21] hover:bg-gray-300 rounded-full p-2"
              />
            </div>
          </header>
          <section>
            <h1 className="text-[35px] font-bold">{product.name}</h1>
            <div aria-label="review ratings" className="my-4">
              {product.rating ? (
                <StarRating
                  rating={Number(product.rating)}
                  reviewCount={Number(product.reviewsCount)}
                />
              ) : (
                <p className="text-gray-500">No ratings yet</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {product.hasDiscount ? (
                <div className="flex space-x-2">
                  <span className="text-lg line-through font-medium text-gray-500">
                    ${product.price}
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    $
                    {(
                      Number(product.price) -
                      (Number(product.price) * Number(product.discount)) / 100
                    ).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
              )}
              {product.hasDiscount && (
                <span className=" bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-lg animate-pulse shadow-md">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div>
              <h1 className="text-[25px] text-[#F59D55] py-4 font-medium">
                In Stock
              </h1>
              <hr className="pb-6 text-gray-300" />
              <p className="text-[18px] font-light pb-6">
                Electric height-adjustable standing desk with memory presets.
              </p>
              <hr className=" text-gray-300" />
            </div>

            <QuantitySelector />

            <div className="flex space-x-5">
              <AddToCartButton
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                discount={product.discount}
                hasDiscount={product.hasDiscount}
              />
              <ButtonWithOutIcon label="Buy Now" />
            </div>

            <section className="grid grid-cols-2 md:grid-cols-3 gap-6 my-12">
              <Stats
                Icon={Shield}
                stats="Free Shiping"
                content="On orders over $50"
              />
              <Stats Icon={Truck} stats="Warranty" content="1 year coverage" />
              <Stats Icon={RotateCcw} stats="Returns" content="30-day policy" />
            </section>
          </section>
        </article>
      </section>

      <section>
        <ProductTabs
          description="Electric height-adjustable standing desk with memory presets. This premium product is designed with attention to detail and quality craftsmanship. Perfect for both everyday use and special occasions, it combines functionality with style to meet your needs."
          specifications="Height: 28-48 inches, Weight Capacity: 150 kg, Material: Steel + MDF, Color: Black, White, Walnut"
          reviews={
            <div>
              <p>No reviews yet.</p>
              {/* Later you can map review components here */}
            </div>
          }
        />

        <RelatedProduct products={product.relatedProducts || []} />
      </section>
    </article>
  );
};

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  console.log("Fetching product with ID:", id);

  const productRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
  );

  if (!productRes.ok) {
    return { notFound: true };
  }

  const product = await productRes.json();

  return {
    props: { product }, // pass to page as prop
  };
};