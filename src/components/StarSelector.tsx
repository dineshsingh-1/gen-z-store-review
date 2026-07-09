"use client";

import { motion } from "framer-motion";

interface StarSelectorProps {
  value: number;
  onChange: (v: number) => void;
}

export default function StarSelector({ value, onChange }: StarSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        return (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            animate={
              filled
                ? { scale: [1, 1.2, 1], transition: { duration: 0.3 } }
                : {}
            }
            onClick={() => onChange(star)}
            className="focus:outline-none"
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            style={{ minWidth: 48, minHeight: 48 }}
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors ${
                filled
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </motion.button>
        );
      })}
      {value > 0 && (
        <span className="ml-2 text-sm font-medium text-gray-500">
          {value === 1 && "Poor"}
          {value === 2 && "Fair"}
          {value === 3 && "Good"}
          {value === 4 && "Very Good"}
          {value === 5 && "Excellent"}
        </span>
      )}
    </div>
  );
}
