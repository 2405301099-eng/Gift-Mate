const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

// Fallback mock data in case server is starting up or disconnected
const FALLBACK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Personalized Photo Frame with Warm LED",
    slug: "personalized-photo-frame-warm-led",
    price: 699,
    originalPrice: 999,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 1240,
    badge: "30% OFF",
    aiTag: "Best for Memories",
    category: "personalized",
    categoryName: "Personalized Keepsakes",
    occasions: ["anniversary", "birthday", "diwali", "wedding"],
    recipientTypes: ["parents", "spouse", "partner", "friend", "sister"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXU_WzpWJFg2cQ8sm7WZGlOrBb5Pc5PSqpRtVwQvgVZ4WA-zETIGI96BT6YyKpGS9UAO_MS14MuT_XEP-kUZmGbuzUbDXXDOuJenr8-d7ww0BMRH3JLP-WnSxVtinpx6VxpCqqo48n_kqcCut46KNdmZKhhy9eWWhFiqIe5Twwi84t0uid1peVxR6FeWW2kzKMBN20O718QhVrDr4UXelVHpjc0FejO6tCfXqGE4tv",
    description: "Warm, customized memory keeper handcrafted with sustainable pine wood and 3000K warm ambient fairy illumination. Perfect for Anniversaries and Diwali housewarmings.",
    packaging: "Complimentary Festive Velvet Box + Wax Sealed Envelope",
    deliveryTime: "Dispatch within 24 Hours via Bluedart / Delhivery",
    presentationScore: 9.8,
    personalizationDepth: "High (Custom Photo & Gold Foil Engraving)",
    waxSealIncluded: true,
    fastDeliveryHours: 24,
    isTrending: true,
    inStock: true
  },
  {
    id: "prod-2",
    name: "Aura Pro Bluetooth Earbuds (Rose Gold)",
    slug: "aura-pro-bluetooth-earbuds-rose-gold",
    price: 1799,
    originalPrice: 2499,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 840,
    badge: "Top Tech",
    aiTag: "Gen-Z & Sibling Pick",
    category: "tech",
    categoryName: "Smart Tech & Audio",
    occasions: ["birthday", "farewell", "rakhi", "diwali"],
    recipientTypes: ["sibling", "brother", "sister", "friend", "teen"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXXrMVk0yJ9buRLfDu7ib0W2gg5KB0WUUoyaERJ6gSYxEENg2qJFpLrGgFzawQMkdyTGjfwK5IFnUxG70Ercbk66Nidr7vq_mz1bfIybUY3mdRESdzFWs_4U4Qj6gOz2RFHYhEqwpKp-qsJLZHPRYjM5fih9OMq9lP6Uz2O3sZVAiDnfqoS6IkLlNHjx9bWh4YnYfAg77nrbKgwElW6Oz4jEKnS--KduJYedlw9XtU",
    description: "Active Noise Cancelling wireless earbuds finished in champagne rose gold. 42-hour playtime with magnetic gift case engraving.",
    packaging: "Signature Satin Pouch with Metallic Magnetic Hardbox",
    deliveryTime: "Express 24-48 Hours across Metro Cities",
    presentationScore: 9.2,
    personalizationDepth: "Medium (Name Laser Etch on Case)",
    waxSealIncluded: true,
    fastDeliveryHours: 24,
    isTrending: true,
    inStock: true
  },
  {
    id: "prod-3",
    name: "Royal Scented Soy Candle Set (Mogra & Sandal)",
    slug: "royal-scented-soy-candle-set",
    price: 599,
    originalPrice: 850,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 920,
    badge: "Handcrafted",
    aiTag: "Diwali Host Favorite",
    category: "home-decor",
    categoryName: "Artisanal Home & Fragrance",
    occasions: ["diwali", "housewarming", "festivals", "wedding"],
    recipientTypes: ["host", "parents", "mother", "in-laws", "colleague"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi__fDd4TowfqMaS5cYX6LsPFLCiCkC6snwikmxgU-i4qpwG3xb4aQQ4fM-dV1qqfiM2GxIBPFrJSkrD_mGLvKCnG3NY0ebXtWn1G5zERh5HQ1m8NRFMKVhZuTLYstwk-bji_k1Oo8S6_ia2MqmngOYyCATa_0PoNTbxBoet69-U9kwaPc8RVFOmmnX0q8GHvEAjkgyH5THsjjIScWcm80Qb3OCl1DRqSK37GuB2Mu",
    description: "Natural organic soy wax infused with authentic Kannauj mogra attar and Mysore sandalwood. Clean 45-hour burn time with zero paraffin.",
    packaging: "Handmade Mulberry Paper Box with Brass Diya Tag",
    deliveryTime: "Dispatch within 24 Hours with Fragile Handling",
    presentationScore: 9.6,
    personalizationDepth: "Medium (Calligraphy Greeting Scroll)",
    waxSealIncluded: true,
    fastDeliveryHours: 36,
    isTrending: true,
    inStock: true
  },
  {
    id: "prod-4",
    name: "Gourmet Artisanal Hamper (Dry Fruit & Cocoa)",
    slug: "gourmet-artisanal-hamper-dry-fruit-cocoa",
    price: 899,
    originalPrice: 1199,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 680,
    badge: "25% OFF",
    aiTag: "Universal Crowdpleaser",
    category: "gourmet",
    categoryName: "Gourmet Hampers & Treats",
    occasions: ["diwali", "festivals", "corporate", "farewell", "wedding"],
    recipientTypes: ["colleague", "client", "family", "boss", "relatives"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCPUUxWMI2btAVaomZIz2F_rnNzhBMWF8dXPz0vCMI0RtG21h6HoqLEbofaDVGRtIu1hHOLqGWBXpPgXmF92QSSsS8bQc_UGZ_ttdvNu_8QjBlYkJuUrEcoQoDTtnYANgAEKUS5gw1FHkxWLrJUHrcZtEldOtJ-LDXD0_UHOaKepJLv783CZ5Gp_Gj3qerPCMZCQlQhnZ7DnGIZ_ErSYb9K4S2pUOTSXHEyeYduEYa",
    description: "Carefully selected Kashmiri roasted nuts paired with 70% dark single-origin chocolate bars. Wrapped in festive royal silk packaging.",
    packaging: "Gold Foiled Rigid Gift Box with Crimson Silk Ribbon",
    deliveryTime: "Temperature-controlled 24-48h Pan-India shipping",
    presentationScore: 9.7,
    personalizationDepth: "Medium (Custom Corporate / Family Name Tag)",
    waxSealIncluded: true,
    fastDeliveryHours: 24,
    isTrending: true,
    inStock: true
  },
  {
    id: "prod-5",
    name: "Diwali & Wedding Curated Luxury Hamper",
    slug: "diwali-wedding-curated-luxury-hamper",
    price: 1499,
    originalPrice: 2199,
    discountPercent: 32,
    rating: 5.0,
    reviewCount: 2450,
    badge: "Festive Bestseller",
    aiTag: "Diwali & Wedding Season",
    category: "festive-hampers",
    categoryName: "Curated Luxury Hampers",
    occasions: ["diwali", "wedding", "anniversary", "housewarming"],
    recipientTypes: ["family", "in-laws", "wedding-couple", "vip-clients"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBanEhCVnizJ9QJPWwD0E62lGdHmKHPK-EOP61eD_C75m0guTDRrR6n2QfjAsuJmUl3txr5QfxN7-zgFDe8KjVRPdvE53IyeNv1OBeZjFfzlEc5LAOFFLMy-hGVr1VcDC_tj-M28DtzClfdLNAYVlYptpbyexYXe84aHHt0vmQ0aB3RPNqaodflb2M3oLaAbrSeUoqzbmKmt5HtZjA0zRXpCOpqlfvRfvxnTs8WiUhk",
    description: "Exquisite modern festive Indian gift box tied with shimmering mulberry ribbon, dry marigold accents, surrounded by warm fairy lights and miniature brass diya on pastel velvet base.",
    packaging: "Handcrafted Teal & Gold Royal Chest with Pure Brass Diya",
    deliveryTime: "Guaranteed Express 24-48 Hours pan-India",
    presentationScore: 10.0,
    personalizationDepth: "High (Calligraphy Message Scroll + Custom Photo Card)",
    waxSealIncluded: true,
    fastDeliveryHours: 24,
    isTrending: true,
    inStock: true
  }
];

export async function fetchProducts(params = {}) {
  try {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.append(key, val);
      }
    });

    const res = await fetch(`${API_BASE_URL}/products?${searchParams.toString()}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn('API error in fetchProducts, using fallback data:', err.message);
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API error in fetchProductById, checking fallback:', err.message);
    return FALLBACK_PRODUCTS.find(p => p.id === id || p.slug === id) || null;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn('API error in fetchCategories, returning standard list:', err.message);
    return [
      { id: "festive-hampers", name: "Curated Luxury Hampers", emoji: "🪔", icon: "featured_seasonal_and_gifts", itemCount: 24, startingPrice: 899 },
      { id: "personalized", name: "Personalized Keepsakes", emoji: "✨", icon: "auto_awesome", itemCount: 38, startingPrice: 499 },
      { id: "gourmet", name: "Gourmet & Treats", emoji: "🍫", icon: "restaurant", itemCount: 31, startingPrice: 599 },
      { id: "home-decor", name: "Artisanal Home & Fragrance", emoji: "🕯️", icon: "spa", itemCount: 29, startingPrice: 399 },
      { id: "tech", name: "Smart Tech & Gadgets", emoji: "🎧", icon: "headphones", itemCount: 18, startingPrice: 1299 }
    ];
  }
}

export async function fetchWishlist() {
  try {
    const res = await fetch(`${API_BASE_URL}/wishlist`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('API error in fetchWishlist, falling back to localStorage:', err.message);
    const local = localStorage.getItem('giftmate_wishlist');
    const ids = local ? JSON.parse(local) : ['prod-1', 'prod-2', 'prod-3'];
    const items = ids.map(id => FALLBACK_PRODUCTS.find(p => p.id === id)).filter(Boolean);
    return { itemIds: ids, items, count: ids.length };
  }
}

export async function toggleWishlist(productId) {
  try {
    const res = await fetch(`${API_BASE_URL}/wishlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    localStorage.setItem('giftmate_wishlist', JSON.stringify(data.itemIds));
    return data;
  } catch (err) {
    console.warn('API error in toggleWishlist, handling in localStorage:', err.message);
    const local = localStorage.getItem('giftmate_wishlist');
    let ids = local ? JSON.parse(local) : ['prod-1', 'prod-2', 'prod-3'];
    const exists = ids.includes(productId);
    if (exists) {
      ids = ids.filter(i => i !== productId);
    } else {
      ids.push(productId);
    }
    localStorage.setItem('giftmate_wishlist', JSON.stringify(ids));
    const items = ids.map(id => FALLBACK_PRODUCTS.find(p => p.id === id)).filter(Boolean);
    return {
      success: true,
      isSaved: !exists,
      count: ids.length,
      itemIds: ids,
      items,
      message: exists ? 'Removed from wishlist' : 'Gift saved to your wishlist!'
    };
  }
}

export async function fetchReminders() {
  try {
    const res = await fetch(`${API_BASE_URL}/reminders`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn('API error in fetchReminders, using local state:', err.message);
    const local = localStorage.getItem('giftmate_reminders');
    return local ? JSON.parse(local) : [
      { id: "rem-1", title: "Diwali Family Celebration", person: "Family & In-Laws", occasion: "Diwali", date: "2026-11-08", daysLeft: 32, budget: 5000, notify: true },
      { id: "rem-2", title: "Mom's 55th Birthday", person: "Maa", occasion: "Birthday", date: "2026-10-24", daysLeft: 17, budget: 3000, notify: true }
    ];
  }
}

export async function createReminder(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/reminders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('API error in createReminder, writing locally:', err.message);
    const local = localStorage.getItem('giftmate_reminders');
    const list = local ? JSON.parse(local) : [];
    const newRem = {
      id: `rem-${Date.now()}`,
      ...payload,
      daysLeft: 14
    };
    list.push(newRem);
    localStorage.setItem('giftmate_reminders', JSON.stringify(list));
    return { success: true, data: newRem };
  }
}

export async function deleteReminder(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/reminders/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error in deleteReminder, deleting locally:', err.message);
    const local = localStorage.getItem('giftmate_reminders');
    if (local) {
      const list = JSON.parse(local).filter(r => r.id !== id);
      localStorage.setItem('giftmate_reminders', JSON.stringify(list));
    }
    return { success: true };
  }
}

export async function matchGifts(quizData) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error in matchGifts, fallback scoring applied:', err.message);
    const scored = FALLBACK_PRODUCTS.map((p, idx) => ({
      ...p,
      matchScore: 98 - (idx * 3),
      customAIReason: `Emotionally tuned for ${quizData.recipient || 'your loved one'} celebrating ${quizData.occasion || 'their special day'}`
    }));
    return { success: true, results: scored, meta: quizData };
  }
}

export async function sendAIChat(message) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error in sendAIChat, using intelligent client response:', err.message);
    return {
      success: true,
      reply: `Namaste! Based on your festive gifting preferences, here are our top handcrafted choices with complimentary wax seal greeting notes:`,
      products: FALLBACK_PRODUCTS.slice(0, 3),
      quickFollowUps: ['Under ₹1000 gifts', 'Diwali hampers', 'Express 24-hr shipping']
    };
  }
}

export async function checkPincode(pincode) {
  try {
    const res = await fetch(`${API_BASE_URL}/pincode/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pincode })
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      success: true,
      pincode,
      city: 'Metro Logistics Hub',
      deliveryHours: 24,
      estimatedDelivery: '24-48 Hours',
      courier: 'Bluedart Express Air',
      waxSealIncluded: true,
      cashOnDelivery: true
    };
  }
}
