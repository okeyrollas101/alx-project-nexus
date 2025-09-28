import type { ProductCard } from "@/interfaces";
import { Heart} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import AddToCartButton from "../common/button/AddToCartButton";
import ProductCardSkeleton from "../common/ProductCardSkeleton";

const ProductCard: React.FC<ProductCard> = ({
  image,
  id,
  name,
  description,
  price,
  rating,
  reviewsCount,
  discount,
  hasDiscount,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200); // 1.2s
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 mt-4">
        <ProductCardSkeleton />
      </div>
    );
  }

  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white flex rounded-[14px] shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        {/* Image Section */}
        <div className="relative group">
          <Image
            src={image}
            alt={name}
            width={280}
            height={280}
            priority
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg animate-pulse shadow-md">
              -{discount}%
            </span>
          )}

          {/* Favorite (Wishlist) Button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white p-2 rounded-full shadow-md opacity-0 hover:opacity-100"
          >
            {isFavorite ? (
              <Heart className="text-[#A95F21] fill-[#A95F21] transition-colors duration-300" />
            ) : (
              <Heart className="text-gray-700 hover:text-[#A95F21] transition-colors duration-300" />
            )}
          </button>
        </div>

        {/* Content Section */}
        <div className="p-5 bg-gray-50">
          {/* Product Name */}
          <h3 className="text-xl font-semibold text-gray-800 hover:text-[#A95F21] mb-1">
            {name.length > 30 ? `${name.slice(0, 30)}...` : name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1 mr-2">
              <FaStar color="#E8E64B" size={18} />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <span className="text-gray-500 text-xs">
              ({reviewsCount} reviews)
            </span>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex justify-between items-center">
            {hasDiscount ? (
              <div className="flex space-x-2">
                <span className="text-lg line-through font-medium text-gray-500">
                  ${price}
                </span>

                <span className="text-xl font-bold text-gray-900">
                  $
                  {(
                    Number(price) -
                    (Number(price) * Number(discount)) / 100
                  ).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-900">${price}</span>
            )}

            <AddToCartButton
              id={id}
              name={name}
              description={description}
              price={price}
              image={image}
              discount={discount}
              hasDiscount={hasDiscount}
              className="px-3 py-1 text-sm"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;