import { keywordBank, openers, closers } from "./keywordBank";

const connectors: Record<string, string[]> = {
  en: ["and", "also", "plus", "moreover", "additionally"],
  hi: ["aur", "or", "saath hi", "iske alawa"],
  hinglish: ["aur", "or", "saath hi", "iske alawa bhi"],
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generateReview(
  selectedKeywordIds: string[],
  language: "en" | "hi" | "hinglish",
  starBucket: "high" | "low",
  variantSeed: number
): string {
  if (selectedKeywordIds.length === 0) return "";

  const selectedKeywords = keywordBank.filter((k) =>
    selectedKeywordIds.includes(k.id)
  );

  const fragments: string[] = [];
  for (const kw of selectedKeywords) {
    const variants = kw.fragments[language];
    if (variants && variants.length > 0) {
      const idx = variantSeed % variants.length;
      fragments.push(variants[idx]);
    }
  }

  const conn = connectors[language] || ["and"];
  let body: string;
  if (fragments.length === 1) {
    body = fragments[0];
  } else {
    body = fragments
      .map((f, i) => {
        if (i === fragments.length - 1) return f;
        if (i === fragments.length - 2)
          return `${f} ${conn[i % conn.length]}`;
        return `${f},`;
      })
      .join(" ");
  }

  const openerPool = openers[starBucket][language];
  const closerPool = closers[starBucket][language];
  const opener = openerPool[variantSeed % openerPool.length];
  const closer = closerPool[(variantSeed + 1) % closerPool.length];

  const full = `${opener} ${body}. ${closer}`;
  return capitalize(full.trim());
}

export function getKeywordsByBucket(
  bucket: "low" | "high",
  language: "en" | "hi" | "hinglish"
) {
  return keywordBank
    .filter((k) => k.star_bucket === bucket)
    .map((k) => ({
      id: k.id,
      label: k.label[language],
    }));
}
