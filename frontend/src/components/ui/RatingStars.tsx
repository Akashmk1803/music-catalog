import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  className?: string;
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = 14, 
  interactive = false,
  onRate,
  className = ''
}: RatingStarsProps) {
  
  return (
    <div className={`flex text-primary ${className}`}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;
        
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => {
              if (interactive && onRate) {
                onRate(starValue);
              }
            }}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${!isFilled && 'text-on-surface-variant/40'}`}
          >
            <Star 
              size={size} 
              fill={isFilled ? 'currentColor' : 'transparent'} 
              strokeWidth={isFilled ? 0 : 1.5}
            />
          </button>
        );
      })}
    </div>
  );
}
