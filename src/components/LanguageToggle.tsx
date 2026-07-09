"use client";

interface LanguageToggleProps {
  value: "en" | "hi" | "hinglish";
  onChange: (v: "en" | "hi" | "hinglish") => void;
}

const labels: Record<string, string> = {
  en: "English",
  hi: "हिन्दी",
  hinglish: "Hinglish",
};

export default function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  const langs: Array<"en" | "hi" | "hinglish"> = ["en", "hi", "hinglish"];
  return (
    <div className="flex items-center justify-center gap-1 bg-gray-100 rounded-full p-1 w-fit mx-auto">
      {langs.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            value === lang
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {labels[lang]}
        </button>
      ))}
    </div>
  );
}
