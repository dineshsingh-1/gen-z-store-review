"use client";

import ReviewForm from "@/components/ReviewForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 py-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            GZ
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 leading-tight">
              Gen Z Store
            </h1>
            <p className="text-xs text-gray-500">Jodhpur</p>
          </div>
        </div>
      </header>
      <section className="flex-1 px-4 py-8">
        <ReviewForm />
      </section>
    </main>
  );
}
