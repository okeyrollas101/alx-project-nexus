import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ICategoryProps } from "@/types";
import { useRouter } from "next/router";

const ProductCategoryCard: React.FC<ICategoryProps> = ({
  categoryId,
  name,
  image,
  description,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleExplore = () => {
    if (!isLoading) {
      setIsLoading(true);
      router.push(`/product/category/${categoryId}`);
    }
  };

  return (
    <div className="relative group rounded-[14px] h-64 shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Category Image */}
      <Image
        src={image}
        alt={name}
        width={350}
        height={280}
        onError={(e) => {
              e.currentTarget.src = "/fallback.png";
            }}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Title + Description */}
      <div className="absolute left-6 bottom-6 w-2/3">
        <h1 className="text-white text-2xl font-bold">{name}</h1>
        {description && (
          <p className="text-gray-200 font-medium text-base mt-1">
            {description}
          </p>
        )}
      </div>

      {/* Hover Content with Button in Top Right */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleExplore}
          role="button"
          className="self-end flex items-center gap-2 bg-[#F59D55]  text-gray-200  p-2 rounded-full hover:bg-[#A95F21] transition"
          aria-label={`Explore ${name}`}
          title="Explore Category"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <ChevronRight size={24} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCategoryCard;