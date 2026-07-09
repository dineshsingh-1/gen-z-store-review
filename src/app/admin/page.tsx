"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Review {
  id: string;
  stars: number;
  language: string;
  source: string;
  keywords: string | null;
  text: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (!showAll) {
      params.set("stars", "3");
      params.set("status", "new");
    }
    const res = await fetch(`/api/admin/reviews?${params.toString()}`);
    if (res.status === 401) {
      setUnauthorized(true);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  }, [showAll]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    if (unauthorized) {
      router.push("/admin/login");
    }
  }, [unauthorized, router]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  };

  const handleExport = async () => {
    const res = await fetch("/api/admin/reviews/export");
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reviews.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const stats = {
    total: reviews.length,
    avgStars:
      reviews.length > 0
        ? (reviews.reduce((a, r) => a + r.stars, 0) / reviews.length).toFixed(1)
        : "—",
    newCount: reviews.filter((r) => r.status === "new").length,
    readCount: reviews.filter((r) => r.status === "read").length,
    resolvedCount: reviews.filter((r) => r.status === "resolved").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Gen Z Store — Reviews
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Stars</p>
            <p className="text-2xl font-bold text-gray-800">{stats.avgStars}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">New</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.newCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Resolved
            </p>
            <p className="text-2xl font-bold text-emerald-600">
              {stats.resolvedCount}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showAll}
              onChange={() => setShowAll((v) => !v)}
              className="rounded border-gray-300"
            />
            Show all reviews (stars &le; 3, not resolved)
          </label>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
          >
            Export CSV
          </button>
        </div>

        <div className="space-y-3">
          {reviews.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              No reviews yet.
            </p>
          )}
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedId(expandedId === review.id ? null : review.id)
                }
                className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{review.stars}★</span>
                  <span className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-[400px]">
                    {review.text}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      review.status === "new"
                        ? "bg-yellow-100 text-yellow-800"
                        : review.status === "read"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {review.status}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedId === review.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {expandedId === review.id && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
                  <p className="text-sm text-gray-700">{review.text}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span>Language: {review.language}</span>
                    <span>Source: {review.source}</span>
                    <span>Stars: {review.stars}</span>
                    <span>
                      Date: {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.keywords && (
                    <div className="text-xs text-gray-500">
                      Keywords: {review.keywords}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {review.status !== "read" && (
                      <button
                        onClick={() => updateStatus(review.id, "read")}
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
                      >
                        Mark Read
                      </button>
                    )}
                    {review.status !== "resolved" && (
                      <button
                        onClick={() => updateStatus(review.id, "resolved")}
                        className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 transition"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
