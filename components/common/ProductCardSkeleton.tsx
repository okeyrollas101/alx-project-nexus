// ProductCardSkeleton.tsx
import React from "react";

function ProductCardSkeleton() {
  return (
    <div className="relative bg-white rounded-[14px] shadow-md overflow-hidden">
      {/* Image Skeleton */}
    <div className="skeleton bg-gradient-to-bl from-green-50 to-green-100 bg-gray-200 animate-pulse w-full h-48 hover:scale-105 transition duration-500 ease-in-out"></div>
       <div className="skeleton bg-gray-200 animate-pulse rounded-lg absolute top-4 left-4  px-6 h-6 w-6"></div> {/* favorate heart */}
        <div className="skeleton bg-gray-200 animate-pulse rounded-full absolute top-4 right-4  h-6 w-6"></div> {/* discount show */}
      {/* Content Skeleton */}
      <div className="p-5 bg-gray-50 space-y-3">
        <div className="skeleton bg-gray-200 animate-pulse h-6 w-3/4"></div> {/* Title */}
        <div className="skeleton bg-gray-200 animate-pulse  h-4 w-full"></div> {/* Description */}
        <div className="skeleton bg-gray-200 animate-pulse  h-4 w-1/2"></div> {/* Rating */}

        <div className="flex justify-between items-center mt-4">
          <div className="skeleton bg-gray-200 animate-pulse  h-6 w-20"></div> {/* Price */}
          <div className="skeleton bg-gray-200 animate-pulse  h-8 w-20 rounded-lg"></div> {/* Button */}
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;