import { Activity, Award, MoveRight, Shield, Star, Truck, Users, Flame, Sparkles } from "lucide-react";
import React from "react";
import Stats from "../common/Stats";
import Image from "next/image";
import Button from "../common/button/ButtonWithIconRight";
import ButtonWithOutIcon from "../common/button/ButtonWithOutIcon";

function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 px-4 py-6 lg:px-16 mt-12">
      {/* Left Content */}
      <article className="w-full lg:w-[60%]">
        <header >
          <button className="flex items-center space-x-2 bg-[#A95F21] hover:bg-[#F59D55] animate-bounce py-2 px-4 rounded-full mb-6 text-white">
            <Activity color="white" />
            <span>New Collection Available</span>
          </button>

          <h1 className="text-[50px] md:text-4xl lg:text-8xl font-bold leading-tight">
             Discover Quality Products Made For{" "}
            <span className="text-[#F59D55] animate-pulse">Everyday Living</span>
          </h1>

          <p className="font-medium text-base md:text-lg lg:text-xl my-6">
            Trusted by 40,000+ happy customers, our curated collection blends innovation with everyday essentials.
             From cutting-edge tech to lifestyle must-haves — we deliver quality that goes beyond expectations
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <Button label="Explore Collection" Icon={MoveRight} />
            <ButtonWithOutIcon label="Browse by Category" />
          </div>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-12">
          <Stats Icon={Star} stats="4.9/5 Stars" content="12,847 Reviews" />
          <Stats Icon={Shield} stats="4.9/5 Stars" content="12,847 Reviews" />
          <Stats Icon={Users} stats="4.9/5 Stars" content="12,847 Reviews" />
          <Stats Icon={Truck} stats="4.9/5 Stars" content="12,847 Reviews" />
        </section>

        <section className="flex flex-col sm:flex-row justify-between mt-6 gap-4 sm:gap-0">
          <div className="flex items-center space-x-4">
            <Award
              color="lightorange"
              className="hover:animate-pulse cursor-pointer"
              size={28}
            />
            <p>Best E-commerce {new Date().getFullYear()}</p>
          </div>
          <p>Featured in TechCrunch, Forbes & Wired</p>
        </section>
      </article>

      {/* Right Hero Image with Buttons */}
      <section className="relative bg-teal-100 flex items-center justify-center rounded-xl w-full sm:w-[400px] md:w-[450px] h-[400px] md:h-[500px] shadow-lg">
        {/* Image container */}
        <div className="shadow-md w-[80%] h-[60%] md:w-[350px] md:h-[300px] px-2 overflow-hidden rounded-lg">
          <Image
            src="/assets/images/pexels-denys.jpg"
            alt="Hero image"
            width={350}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Buttons */}
        <button className="flex absolute right-2 top-2 sm:top-[-14px] items-center space-x-2 bg-[#A95F21] hover:bg-[#F59D55] text-white py-2 px-4 rounded-full transition duration-300 ease-in-out text-sm sm:text-base">
        <Flame color="#D7D725" className="animate-pulse hover:animate-spin" />
        <span> Limited Time: 20% Off</span>
        </button>

        <button className="flex absolute left-2 rotate-[340deg] hover:rotate-0 transition duration-300 ease-in-out text-white items-center space-x-2 bg-[#A95F21] hover:bg-[#F59D55] py-2 px-4 rounded-full text-sm sm:text-base">
          Trending Now
        </button>

        <button className="flex absolute left-2 bottom-2 items-center space-x-2 bg-[#A95F21] hover:bg-[#F59D55] text-white animate-bounce py-2 px-4 rounded-full text-sm sm:text-base">
        <Sparkles color="#D7D725" className="animate-pulse hover:animate-spin"/>
         <span> Premium Quality Guaranteed</span>
        </button>
      </section>

    </section>
  );
}

export default Hero;