import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;       // must be a number, e.g., 4.5
  totalStars?: number;  // default 5
  reviewCount?: number;  // default 5

}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5,reviewCount }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        const isFull = starValue <= Math.floor(rating);
        const isHalf = !isFull && starValue - rating < 1;

        return (
          <Star
            key={index}
            size={24}
            fill={isFull ? "gold" : isHalf ? "url(#half-fill)" : "none"}
            stroke={isFull || isHalf ? "gold" : "gray"}
          />
        );
      })}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)} ({reviewCount} reviews)</span>

      {/* Optional: SVG gradient for half star */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stopColor="gold" />
            <stop offset="50%" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default StarRating;