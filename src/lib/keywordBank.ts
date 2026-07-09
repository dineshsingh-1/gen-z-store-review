export interface Keyword {
  id: string;
  star_bucket: "low" | "high";
  label: { en: string; hi: string; hinglish: string };
  fragments: {
    en: string[];
    hi: string[];
    hinglish: string[];
  };
}

export const keywordBank: Keyword[] = [
  {
    id: "best_quality",
    star_bucket: "high",
    label: { en: "Best quality", hi: "Behtareen quality", hinglish: "Best quality" },
    fragments: {
      en: [
        "the product quality is outstanding",
        "really impressed with the build quality",
        "quality of items is top-notch",
      ],
      hi: [
        "product ki quality bahut achhi hai",
        "quality ne bahut impress kiya",
        "saaman ki quality behtareen hai",
      ],
      hinglish: [
        "product quality bahut outstanding hai",
        "quality se main bahut impressed hoon",
        "items ki quality top-notch hai",
      ],
    },
  },
  {
    id: "trendy_collection",
    star_bucket: "high",
    label: { en: "Trendy collection", hi: "Trendy collection", hinglish: "Trendy collection" },
    fragments: {
      en: [
        "they have the most trendy collection",
        "loved the modern and stylish collection",
        "collection is very up-to-date with trends",
      ],
      hi: [
        "inke collection bahut trendy hai",
        "modern aur stylish collection bahut achha laga",
        "collection current trends ke hisaab se hai",
      ],
      hinglish: [
        "inka collection bahut trendy hai",
        "modern aur stylish collection bahut achha laga",
        "collection totally up-to-date hai trends ke saath",
      ],
    },
  },
  {
    id: "reasonable_pricing",
    star_bucket: "high",
    label: { en: "Reasonable pricing", hi: "Reasonable pricing", hinglish: "Reasonable pricing" },
    fragments: {
      en: [
        "prices are very reasonable for the quality",
        "great value for money",
        "affordable pricing compared to other stores",
      ],
      hi: [
        "prices bahut reasonable hain quality ke hisaab se",
        "paisa vasool hai",
        "doosre stores ke comparison mein prices achhe hain",
      ],
      hinglish: [
        "prices bahut reasonable hain quality ke hisaab se",
        "paisa vasool product hai",
        "compared to other stores, pricing is good",
      ],
    },
  },
  {
    id: "good_staff_behavior",
    star_bucket: "high",
    label: { en: "Good staff behavior", hi: "Staff ka achha behavior", hinglish: "Staff ka achha behavior" },
    fragments: {
      en: [
        "the staff was very helpful and polite",
        "staff behavior was excellent and welcoming",
        "employees were courteous and friendly",
      ],
      hi: [
        "staff bahut helpful aur polite tha",
        "staff ka behavior excellent aur welcoming tha",
        "employees ne bahut achha behavior dikhaya",
      ],
      hinglish: [
        "staff bahut helpful aur polite tha",
        "staff ka behavior excellent aur welcoming tha",
        "employees ne bahut friendly behavior dikhaya",
      ],
    },
  },
  {
    id: "multiple_variety",
    star_bucket: "high",
    label: { en: "Multiple variety", hi: "Kaafi variety", hinglish: "Kaafi variety" },
    fragments: {
      en: [
        "huge variety of products to choose from",
        "they have multiple options in every category",
        "lots of variety available under one roof",
      ],
      hi: [
        "products ki bahut saari variety hai",
        "har category mein multiple options hain",
        "ek hi jagah bahut saari variety available hai",
      ],
      hinglish: [
        "products ki bahut variety hai choose karne ke liye",
        "har category mein multiple options available hain",
        "one roof ke neeche bahut saari variety hai",
      ],
    },
  },
  {
    id: "great_fitting_sizing",
    star_bucket: "high",
    label: { en: "Great fitting / sizing", hi: "Fitting aur sizing achhi", hinglish: "Fitting aur sizing achhi" },
    fragments: {
      en: [
        "the fitting was perfect, true to size",
        "sizing is accurate and consistent",
        "clothes fit really well, no issues with sizing",
      ],
      hi: [
        "fitting bilkul perfect tha",
        "sizing accurate aur consistent hai",
        "kapde bilkul sahi fit aate hain",
      ],
      hinglish: [
        "fitting bilkul perfect tha, true to size",
        "sizing accurate aur consistent hai",
        "clothes ka fit bahut achha hai",
      ],
    },
  },
  {
    id: "store_ambiance",
    star_bucket: "high",
    label: { en: "Store ambiance", hi: "Store ka mahaul", hinglish: "Store ka mahaul" },
    fragments: {
      en: [
        "the store has a great ambiance",
        "loved the vibe and decor of the store",
        "store is well-maintained and inviting",
      ],
      hi: [
        "store ka mahaul bahut achha hai",
        "store ki vibe aur decor bahut achhi hai",
        "store well-maintained aur inviting hai",
      ],
      hinglish: [
        "store ka ambiance bahut achha hai",
        "store ki vibe aur decor bahut achhi hai",
        "store well-maintained aur welcoming hai",
      ],
    },
  },
  {
    id: "easy_exchange_return",
    star_bucket: "high",
    label: { en: "Easy exchange / return", hi: "Exchange return easy", hinglish: "Exchange return easy" },
    fragments: {
      en: [
        "exchange and return process is hassle-free",
        "very easy return policy",
        "no questions asked exchange policy is great",
      ],
      hi: [
        "exchange aur return process bahut easy hai",
        "return policy bahut simple hai",
        "bina jhanjhat ke exchange mil jaata hai",
      ],
      hinglish: [
        "exchange aur return process hassle-free hai",
        "return policy bahut easy hai",
        "bina kisi jhanjhat ke exchange ho jaata hai",
      ],
    },
  },
  {
    id: "great_overall_experience",
    star_bucket: "high",
    label: { en: "Great overall experience", hi: "Overall experience achha", hinglish: "Overall experience achha" },
    fragments: {
      en: [
        "overall it was a fantastic shopping experience",
        "had a wonderful time shopping here",
        "highly recommend this store for shopping",
      ],
      hi: [
        "overall shopping experience fantastic raha",
        "yahaan shopping karke bahut achha laga",
        "is store ko main sabko recommend karunga",
      ],
      hinglish: [
        "overall shopping experience fantastic raha",
        "yahaan shopping karke bahut achha laga",
        "highly recommend karta hoon is store ko",
      ],
    },
  },
  {
    id: "cleanliness",
    star_bucket: "high",
    label: { en: "Cleanliness", hi: "Saaf safai", hinglish: "Cleanliness" },
    fragments: {
      en: [
        "the store is very clean and hygienic",
        "cleanliness standards are high",
        "well-maintained and clean environment",
      ],
      hi: [
        "store bahut saaf aur hygienic hai",
        "safai ka bahut dhyan rakha jaata hai",
        "saaf suthra environment hai",
      ],
      hinglish: [
        "store bahut clean aur hygienic hai",
        "cleanliness standards bahut high hain",
        "well-maintained aur clean environment hai",
      ],
    },
  },
  {
    id: "billing_speed",
    star_bucket: "high",
    label: { en: "Billing speed", hi: "Billing ki speed", hinglish: "Billing ki speed" },
    fragments: {
      en: [
        "billing process was very quick",
        "didn't have to wait long at the counter",
        "fast and efficient checkout experience",
      ],
      hi: [
        "billing bahut jaldi hui",
        "counter pe zyada wait nahi karna pada",
        "fast aur efficient checkout tha",
      ],
      hinglish: [
        "billing process bahut quick tha",
        "counter pe zyada wait nahi karna pada",
        "fast aur efficient checkout experience tha",
      ],
    },
  },
  {
    id: "pricing_too_high",
    star_bucket: "low",
    label: { en: "Pricing too high", hi: "Price zyada hai", hinglish: "Price zyada hai" },
    fragments: {
      en: [
        "prices are a bit too high",
        "not very affordable compared to other stores",
        "overpriced for the quality offered",
      ],
      hi: [
        "prices thode zyada hain",
        "doosre stores se comparison mein mehnga hai",
        "quality ke hisaab se price zyada hai",
      ],
      hinglish: [
        "prices thode zyada hain",
        "compared to other stores, thoda mehnga hai",
        "overpriced hai quality ke hisaab se",
      ],
    },
  },
  {
    id: "sizing_issue",
    star_bucket: "low",
    label: { en: "Sizing issue", hi: "Sizing ka issue", hinglish: "Sizing ka issue" },
    fragments: {
      en: [
        "had some issues with the sizing",
        "sizing was not consistent across items",
        "the fit was not as expected",
      ],
      hi: [
        "sizing mein thoda issue tha",
        "sizing consistent nahi thi",
        "fit waisa nahi tha jaisa expected tha",
      ],
      hinglish: [
        "sizing mein thoda issue tha",
        "sizing consistent nahi thi items mein",
        "fit as expected nahi tha",
      ],
    },
  },
  {
    id: "bad_staff_behavior",
    star_bucket: "low",
    label: { en: "Bad staff behavior", hi: "Staff behavior achha nahi", hinglish: "Staff behavior achha nahi" },
    fragments: {
      en: [
        "staff behavior could have been better",
        "the employees were not very helpful",
        "customer service was below expectations",
      ],
      hi: [
        "staff ka behavior achha nahi tha",
        "employees ne zyada help nahi ki",
        "customer service ummeed se kam tha",
      ],
      hinglish: [
        "staff behavior achha nahi tha",
        "employees ne zyada help nahi ki",
        "customer service was below expectations",
      ],
    },
  },
  {
    id: "quality_below_expectation",
    star_bucket: "low",
    label: { en: "Quality below expectation", hi: "Quality ummeed se kam", hinglish: "Quality ummeed se kam" },
    fragments: {
      en: [
        "the quality didn't meet my expectations",
        "product quality was disappointing",
        "not happy with the quality of items",
      ],
      hi: [
        "quality ummeed ke hisaab se nahi thi",
        "product quality disappointing thi",
        "items ki quality se khush nahi hoon",
      ],
      hinglish: [
        "quality expectations ke according nahi thi",
        "product quality disappointing thi",
        "quality se khush nahi hoon",
      ],
    },
  },
  {
    id: "limited_variety",
    star_bucket: "low",
    label: { en: "Limited variety", hi: "Kam variety", hinglish: "Kam variety" },
    fragments: {
      en: [
        "the variety of products is limited",
        "not enough options to choose from",
        "could use a wider selection of items",
      ],
      hi: [
        "products ki variety limited hai",
        "choose karne ke liye zyada options nahi hain",
        "aur items ka selection hona chahiye",
      ],
      hinglish: [
        "variety limited hai products ki",
        "choose karne ke liye enough options nahi hain",
        "wider selection hona chahiye items ka",
      ],
    },
  },
  {
    id: "billing_checkout_issue",
    star_bucket: "low",
    label: { en: "Billing / checkout issue", hi: "Billing mein problem", hinglish: "Billing mein problem" },
    fragments: {
      en: [
        "the billing process was slow",
        "had issues at the checkout counter",
        "checkout experience was not smooth",
      ],
      hi: [
        "billing process slow tha",
        "checkout counter pe problem hui",
        "billing ka experience smooth nahi tha",
      ],
      hinglish: [
        "billing process slow tha",
        "checkout pe issues the",
        "billing experience smooth nahi tha",
      ],
    },
  },
  {
    id: "cleanliness_issue",
    star_bucket: "low",
    label: { en: "Cleanliness issue", hi: "Safai ka issue", hinglish: "Safai ka issue" },
    fragments: {
      en: [
        "the store wasn't very clean",
        "cleanliness could be improved",
        "found the store a bit untidy",
      ],
      hi: [
        "store itna saaf nahi tha",
        "safai aur behtar ho sakti hai",
        "store thoda ganda sa lag raha tha",
      ],
      hinglish: [
        "store itna clean nahi tha",
        "cleanliness improve ki ja sakti hai",
        "store thoda untidy tha",
      ],
    },
  },
  {
    id: "return_exchange_hassle",
    star_bucket: "low",
    label: { en: "Return / exchange hassle", hi: "Exchange mein jhanjhat", hinglish: "Exchange mein jhanjhat" },
    fragments: {
      en: [
        "the return process was complicated",
        "had a lot of hassle with the exchange",
        "return policy needs to be simplified",
      ],
      hi: [
        "return process bahut complicated tha",
        "exchange karane mein bahut jhanjhat hui",
        "return policy simple honi chahiye",
      ],
      hinglish: [
        "return process complicated tha",
        "exchange karane mein bahut hassle hui",
        "return policy simplify karni chahiye",
      ],
    },
  },
  {
    id: "stock_unavailable",
    star_bucket: "low",
    label: { en: "Stock unavailable", hi: "Stock nahi tha", hinglish: "Stock nahi tha" },
    fragments: {
      en: [
        "many items were out of stock",
        "the item I wanted wasn't available",
        "stock availability is inconsistent",
      ],
      hi: [
        "kaafi saare items out of stock the",
        "jo cheez chahiye thi woh available nahi thi",
        "stock availability consistent nahi hai",
      ],
      hinglish: [
        "kaafi items out of stock the",
        "jo item chahiye tha woh available nahi tha",
        "stock availability consistent nahi hai",
      ],
    },
  },
];

export interface OpenerCloser {
  en: string[];
  hi: string[];
  hinglish: string[];
}

export const openers: Record<"high" | "low", OpenerCloser> = {
  high: {
    en: [
      "Overall really happy with my experience —",
      "Had a great time shopping here —",
      "Highly recommend this store —",
      "Really enjoyed visiting this store —",
    ],
    hi: [
      "Overall bahut achha experience raha —",
      "Yahaan shopping karke maza aa gaya —",
      "Main is store ko zaroor recommend karunga —",
      "Store ka visit bahut achha raha —",
    ],
    hinglish: [
      "Overall bahut achha experience raha —",
      "Yahaan shopping karke maza aa gaya —",
      "Main is store ko zaroor recommend karunga —",
      "Store ka visit bahut achha raha —",
    ],
  },
  low: {
    en: [
      "Wasn't fully satisfied because —",
      "Had a few issues during my visit —",
      "There is room for improvement —",
      "My experience was mixed —",
    ],
    hi: [
      "Poori tarah se satisfied nahi hoon kyunki —",
      "Kuch cheezein achhi nahi lagi —",
      "Improvement ki gunnjayish hai —",
      "Mera experience kuch khaas achha nahi tha —",
    ],
    hinglish: [
      "Poori tarah satisfied nahi hoon because —",
      "Kuch cheezein achhi nahi lagi —",
      "Improvement ki gunnjayish hai —",
      "Mera experience kuch khaas achha nahi tha —",
    ],
  },
};

export const closers: Record<"high" | "low", OpenerCloser> = {
  high: {
    en: [
      "Will definitely visit again!",
      "Totally worth it!",
      "Highly recommended!",
      "Keep up the great work!",
    ],
    hi: [
      "Pakka dobara aaunga!",
      "Bilkul worth it tha!",
      "Zaroor recommend karunga!",
      "Aise hi achha kaam karte raho!",
    ],
    hinglish: [
      "Pakka dobara aaunga!",
      "Bilkul worth it tha!",
      "Highly recommended!",
      "Aise hi achha kaam karte raho!",
    ],
  },
  low: {
    en: [
      "Hope these issues get fixed soon.",
      "Would consider coming back if things improve.",
      "Just sharing honest feedback for improvement.",
      "Hope the store takes this feedback positively.",
    ],
    hi: [
      "Ummeed hai yeh issues jald theek ho jayenge.",
      "Agar cheezein sudhar jayengi to vapas aaunga.",
      "Bas improvement ke liye honest feedback de raha hoon.",
      "Ummeed hai store yeh feedback positively lega.",
    ],
    hinglish: [
      "Ummeed hai yeh issues jald theek ho jayenge.",
      "Agar cheezein improve hui to vapas aaunga.",
      "Bas improvement ke liye honest feedback de raha hoon.",
      "Hope the store takes this feedback positively.",
    ],
  },
};
