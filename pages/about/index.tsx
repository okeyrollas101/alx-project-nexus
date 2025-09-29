import React from "react";
import Stat from "@/components/about/Stat";
import ButtonWithOutIcon from "@/components/common/button/ButtonWithOutIcon";
import { useRouter } from "next/router";
import Image from "next/image";
import ValueCard from "@/components/about/ValueCard";
import { Award, Heart, Shield, Truck, Users } from "lucide-react";
import { FaStar } from "react-icons/fa";
import TeamCard from "@/components/about/TeamCard";

const AboutPage = () => {
  const route = useRouter();
  return (
    <section
      aria-label="about page"
      className="min-h-screen lg:pt-24 px-4 py-12 lg:px-12 border-t-2 border-t-gray-100 bg-white"
    >
      <header className="text-center space-y-1 mb-12 px-4 lg:w-5xl w-md mx-auto">
        <h1 className="lg:text-[60px] text-[35px] font-bold">
          Exuding Excellence Since 2025
        </h1>
        <p className="text-xl px-6 max-w-4xl mx-auto text-gray-600">
          We&apos;re passionate about bringing you the finest products from around
          the world, carefully selected for quality, style, and value.
        </p>
      </header>
      <article className="lg:px-4 px-0 mx-auto space-y-6">
        <div
          className="grid lg:grid-cols-4 grid-cols-2 gap-8"
          aria-label="statistics section"
        >
          <Stat
            stats="100K+"
            content="Happy Customers"
            className="bg-gray-100 rounded-2xl py-4 hover:bg-gray-200 hover:shadow-md transition duration-500 ease-linear"
          />
          <Stat
            stats="20K+"
            content="Products"
            className="bg-gray-100 rounded-2xl py-4 hover:bg-gray-200 hover:shadow-md transition duration-500 ease-linear"
          />
          <Stat
            stats="99.9%"
            content="Uptime"
            className="bg-gray-100 rounded-2xl py-4 hover:bg-gray-200 hover:shadow-md transition duration-500 ease-linear"
          />
          <Stat
            stats="24/7"
            content="Support"
            className="bg-gray-100 rounded-2xl py-4 hover:bg-gray-200 hover:shadow-md transition duration-500 ease-linear"
          />
        </div>
        <section className="lg:flex lg:space-x-12 lg:items-center lg:justify-between lg:gap-16 mt-12">
          <article className="space-y-6 mx-auto text-start">
            <h2 className="text-[35px] font-bold">Our Story</h2>
            <p className="text-[18px]">
              Founded in 2025, Shoppers began as a simple idea: to create a
              shopping experience that puts quality and customer satisfaction
              first. What started as a small team with big dreams has grown into
              a trusted destination for thousands of customers worldwide.
            </p>
            <p className="text-[18px]">
              We believe that shopping should be more than just a transaction.
              It should be an experience that delights, inspires, and connects
              people with products they truly love.
            </p>
            <ButtonWithOutIcon
              label="Explore Our Products"
              onClick={() => route.push("/catalog")}
            />
          </article>
          <figure className="relative">
            <Image
              src="/assets/images/about-image-modern-office-team.png"
              alt="About Us Image"
              width={1200}
              height={600}
              className="rounded-2xl mt-12 object-cover hover:scale-105 transition-scale duration-500 ease-in-out"
            />
          </figure>
        </section>
        <section className="w-full my-12">
          <article className="space-y-6 mx-auto text-center">
            <h2 className="text-[35px] font-bold">Our Values</h2>
            <p className="text-[18px]">
              These core principles guide everything we do and shape the
              experience we create for our customers.
            </p>
          </article>
          <article className="mt-12 grid md:grid-cols-4 grid-cols-2  gap-8">
            <ValueCard
              Icon={Heart}
              value="Customer First"
              content="Every decision we make starts with our customers in mind."
            />
            <ValueCard
              Icon={Award}
              value=" Quality Excellence"
              content="We curate only the finest products that meet our high standards."
            />
            <ValueCard
              Icon={Shield}
              value="Trust & Security"
              content="Your privacy and security are our top priorities."
            />
            <ValueCard
              Icon={Truck}
              value="Fast Delivery"
              content="Quick and reliable shipping to get your orders to you fast."
            />
          </article>
        </section>

        <section className="flex flex-col items-center justify-center">
          <article className="flex justify-center">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="mt-12">
                <FaStar
                  className="text-[#F59D55] hover:text-[#A95F21] m-4 animate-pulse"
                  size={32}
                />
              </div>
            ))}
          </article>
          <h3 className="text-center text-[30px]">Meet Our Team</h3>
          <p className="text-center text-[18px] max-w-2xl mt-4">
            The passionate people behind Shoppers who work tirelessly to
            bring you the best shopping experience.
          </p>
          <article className="mt-12 grid md:grid-cols-3 grid-cols-1  gap-8">
            <TeamCard
              Icon={Users}
              role="Founder & CEO"
              name="Okechukwu Obileke"
              content="Passionate about creating exceptional shopping experiences."
            />
            <TeamCard
              Icon={Users}
              role="Head of Product"
              name="Vivian Ekpe"
              content="Ensures every product meets our quality standards."
            />
            <TeamCard
              Icon={Users}
              role="Customer Success"
              name="Ghidigram"
              content="Dedicated to making every customer interaction perfect."
            />
          </article>
        </section>

        <section className="flex flex-col items-center justify-center text-center bg-gray-200 rounded-md  py-12 my-12">
          <h1 className="text-[35px] font-bold mt-8">
            Ready to Start Shopping?
          </h1>
          <p className="text-[18px] max-w-3xl mt-2">
            Join thousands of satisfied customers who trust Shoppers for
            their shopping needs.
          </p>
          <div className=" block space-y-4 lg:flex lg:space-x-12  mt-8">
            <button
              onClick={() => route.push("/catalog")}
              className="font-medium cursor-pointer text-xl flex items-center justify-center gap-2 w-[350.54px] rounded-[8px]  px-4 py-3 text-gray-100 border-2 border-gray-300 bg-[#F59D55] hover:bg-[#A95F21] hover:text-white transition"
            >
              <span>Browse Catalog</span>
            </button>
            <button
              onClick={() => route.push("/categories")}
              className="font-medium cursor-pointer text-xl flex items-center justify-center gap-2 w-[350.54px] rounded-[8px]  px-4 py-3 text-gray-800 border-2 border-gray-300 bg-gray-50 hover:bg-[#A95F21] hover:text-white transition"
            >
              <span>Shop by Category</span>
            </button>
          </div>
        </section>
      </article>
    </section>
  );
};

export default AboutPage;