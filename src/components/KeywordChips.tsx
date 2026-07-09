"use client";

import { motion } from "framer-motion";

interface KeywordChipsProps {
  keywords: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}

export default function KeywordChips({ keywords, selected, onToggle }: KeywordChipsProps) {
  if (keywords.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {keywords.map((kw) => {
        const isSelected = selected.includes(kw.id);
        return (
          <motion.button
            key={kw.id}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(kw.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
              isSelected
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
            }`}
          >
            {kw.label}
          </motion.button>
        );
      })}
    </div>
  );
}
