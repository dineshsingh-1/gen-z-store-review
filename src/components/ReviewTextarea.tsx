"use client";

interface ReviewTextareaProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function ReviewTextarea({
  value,
  onChange,
  placeholder,
}: ReviewTextareaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Write your review..."}
      rows={4}
      className="w-full rounded-lg border border-gray-300 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
    />
  );
}
