"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarSelector from "./StarSelector";
import LanguageToggle from "./LanguageToggle";
import KeywordChips from "./KeywordChips";
import ReviewTextarea from "./ReviewTextarea";
import Toast from "./Toast";
import { getKeywordsByBucket, generateReview } from "@/lib/generateReview";

type Step = "stars" | "review";
type Mode = "write" | "keywords";
type Lang = "en" | "hi" | "hinglish";

export default function ReviewForm() {
  const [stars, setStars] = useState(0);
  const [step, setStep] = useState<Step>("stars");
  const [language, setLanguage] = useState<Lang>("en");
  const [mode, setMode] = useState<Mode>("write");
  const [reviewText, setReviewText] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [variantSeed, setVariantSeed] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const starBucket = stars >= 1 && stars <= 3 ? "low" : stars >= 4 ? "high" : null;
  const keywords = starBucket
    ? getKeywordsByBucket(starBucket, language)
    : [];

  const handleStarChange = (v: number) => {
    setStars(v);
    setStep("review");
    setSelectedKeywords([]);
    setReviewText("");
    setVariantSeed(0);
  };

  const toggleKeyword = (id: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleGenerate = useCallback(() => {
    if (!starBucket) return;
    setVariantSeed((prev) => prev + 1);
    const text = generateReview(selectedKeywords, language, starBucket, variantSeed);
    setReviewText(text);
  }, [selectedKeywords, language, starBucket, variantSeed]);

  const handleRegenerate = () => {
    if (!starBucket) return;
    const newSeed = variantSeed + 1;
    setVariantSeed(newSeed);
    const text = generateReview(selectedKeywords, language, starBucket, newSeed);
    setReviewText(text);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
  };

  const handlePublish = async () => {
    if (!reviewText.trim() || stars === 0) return;
    setLoading(true);

    const source =
      mode === "write" ? "custom" : reviewText.trim() ? "generated_edited" : "generated";

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stars,
          language,
          source,
          keywords: selectedKeywords.length > 0 ? JSON.stringify(selectedKeywords) : null,
          text: reviewText.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      if (stars >= 4) {
        try {
          await navigator.clipboard.writeText(reviewText.trim());
        } catch {
          const ta = document.createElement("textarea");
          ta.value = reviewText.trim();
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        showToast("Copied! Taking you to Google…");
        setTimeout(() => {
          window.location.href = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL;
        }, 900);
      } else {
        setSubmitted(true);
      }
    } catch {
      alert("Network error. Please try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-5xl mb-4">🙏</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-500">Your review has been submitted.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <AnimatePresence mode="wait">
        {step === "stars" && (
          <motion.div
            key="stars"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Tap to rate your experience
            </h2>
            <StarSelector value={stars} onChange={handleStarChange} />
            {stars > 0 && (
              <p className="mt-4 text-sm text-gray-400">
                {stars === 1 && "1 star — Poor"}
                {stars === 2 && "2 stars — Fair"}
                {stars === 3 && "3 stars — Good"}
                {stars === 4 && "4 stars — Very Good"}
                {stars === 5 && "5 stars — Excellent"}
              </p>
            )}
          </motion.div>
        )}

        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <StarSelector value={stars} onChange={handleStarChange} />
            </div>

            <LanguageToggle value={language} onChange={setLanguage} />

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setMode("write")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === "write"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Write your own
              </button>
              <button
                type="button"
                onClick={() => setMode("keywords")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === "keywords"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Quick keywords
              </button>
            </div>

            {mode === "keywords" && (
              <div className="space-y-3">
                <KeywordChips
                  keywords={keywords}
                  selected={selectedKeywords}
                  onToggle={toggleKeyword}
                />
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={selectedKeywords.length === 0}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Generate Review
                  </button>
                  {reviewText && (
                    <button
                      type="button"
                      onClick={handleRegenerate}
                      className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                    >
                      Regenerate
                    </button>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Your review
              </label>
              <ReviewTextarea
                value={reviewText}
                onChange={setReviewText}
                placeholder="Share your experience..."
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handlePublish}
                disabled={!reviewText.trim() || loading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-base font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition shadow"
              >
                {loading ? "Submitting…" : "Publish"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
