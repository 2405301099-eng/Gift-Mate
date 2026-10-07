import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/client';

export default function HomeDiscovery({ onNavigate, onOpenProductDetail }) {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState('Diwali & Festivals');

  useEffect(() => {
    async function loadData() {
      const prods = await fetchProducts({ trending: 'true' });
      setTrendingProducts(prods.slice(0, 4));
    }
    loadData();
  }, []);

  const occasionsList = [
    { name: 'Diwali & Festivals', emoji: '🪔', filter: 'diwali' },
    { name: 'Birthdays', emoji: '🎂', filter: 'birthday' },
    { name: 'Anniversary', emoji: '💕', filter: 'anniversary' },
    { name: 'Weddings', emoji: '💍', filter: 'wedding' },
    { name: 'Farewell & Work', emoji: '💼', filter: 'farewell' },
    { name: 'Valentine’s Day', emoji: '🌹', filter: 'valentine' },
  ];

  const handleOccasionClick = async (occ) => {
    setSelectedOccasion(occ.name);
    const prods = await fetchProducts({ occasion: occ.filter });
    if (prods.length > 0) {
      setTrendingProducts(prods.slice(0, 4));
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 max-w-5xl mx-auto">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-gutter-sm pt-space-md pb-space-lg">
        {/* Ambient Festive Glow Blobs */}
        <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full bg-secondary-fixed-dim/40 blur-3xl pointer-events-none"></div>
        <div className="absolute top-24 -right-16 w-64 h-64 rounded-full bg-primary-fixed-dim/50 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Trust AI Badge */}
          <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface shadow-sm mb-space-md">
            <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="font-label-md text-label-md font-semibold tracking-wide text-primary">
              India’s #1 AI-Powered Gift Finder
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display-hero-mobile sm:font-display-hero text-display-hero-mobile sm:text-display-hero text-on-surface tracking-tight max-w-xl mb-space-sm">
            Make Every Moment <br />
            <span className="bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent">
              Gift-Worthy
            </span>
          </h1>

          {/* Supporting Body */}
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg leading-relaxed">
            Discover thoughtful gifts personalized for the people who matter most. Powered by emotional AI &amp; curated for Indian celebrations.
          </p>

          {/* CTAs */}
          <div className="flex flex-col w-full gap-space-sm sm:flex-row sm:justify-center max-w-sm mb-space-lg">
            <button 
              type="button"
              onClick={() => onNavigate('ai-gift-finder')}
              className="w-full sm:w-auto flex items-center justify-center gap-space-xs py-3.5 px-6 rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary shadow-lg shadow-primary-container/25 active:scale-95 transition-transform group"
            >
              <span className="material-symbols-outlined text-[20px] text-tertiary-fixed group-hover:rotate-12 transition-transform">
                auto_awesome
              </span>
              <span className="font-label-lg text-label-lg text-on-primary">
                Find My Perfect Gift
              </span>
            </button>

            <button 
              type="button"
              onClick={() => onNavigate('curated-recommendations')}
              className="w-full sm:w-auto flex items-center justify-center gap-space-xs py-3.5 px-6 rounded-full bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container-low transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">storefront</span>
              <span className="font-label-lg text-label-lg text-primary">Explore Gifts</span>
            </button>
          </div>

          {/* Hero Featured Media Card */}
          <div 
            onClick={() => onNavigate('festive-categories')}
            className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest p-2 mb-space-md cursor-pointer hover:shadow-2xl transition-shadow"
          >
            <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                alt="Curated Luxury Hampers" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBanEhCVnizJ9QJPWwD0E62lGdHmKHPK-EOP61eD_C75m0guTDRrR6n2QfjAsuJmUl3txr5QfxN7-zgFDe8KjVRPdvE53IyeNv1OBeZjFfzlEc5LAOFFLMy-hGVr1VcDC_tj-M28DtzClfdLNAYVlYptpbyexYXe84aHHt0vmQ0aB3RPNqaodflb2M3oLaAbrSeUoqzbmKmt5HtZjA0zRXpCOpqlfvRfvxnTs8WiUhk" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent flex items-end p-space-md">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col text-left">
                    <span className="font-label-md text-label-md text-tertiary-fixed font-bold tracking-wider uppercase">
                      Diwali &amp; Wedding Season
                    </span>
                    <span className="font-headline-sm text-headline-sm text-inverse-on-surface">
                      Curated Luxury Hampers
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-secondary text-on-secondary font-label-md text-label-md font-bold">
                    From ₹499
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Trust Badges Strip */}
          <div className="grid grid-cols-3 gap-space-xs w-full pt-space-xs">
            <div className="flex flex-col items-center p-2 rounded-xl bg-surface-container-low text-center">
              <span className="material-symbols-outlined text-[20px] text-primary mb-1">local_shipping</span>
              <span className="font-label-md text-[11px] leading-tight text-on-surface font-semibold">Pan-India Express</span>
              <span className="font-body-sm text-[10px] text-on-surface-variant">48-Hr Delivery</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl bg-surface-container-low text-center">
              <span className="material-symbols-outlined text-[20px] text-secondary mb-1">featured_seasonal_and_gifts</span>
              <span className="font-label-md text-[11px] leading-tight text-on-surface font-semibold">Custom Wax Seal</span>
              <span className="font-body-sm text-[10px] text-on-surface-variant">Handwritten Note</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl bg-surface-container-low text-center">
              <span className="material-symbols-outlined text-[20px] text-tertiary-container mb-1">sentiment_very_satisfied</span>
              <span className="font-label-md text-[11px] leading-tight text-on-surface font-semibold">100% Delight</span>
              <span className="font-body-sm text-[10px] text-on-surface-variant">Hassle-free swap</span>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR OCCASIONS CAROUSEL */}
      <section className="mt-space-md">
        <div className="px-gutter-sm flex items-center justify-between mb-space-sm">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Trending Occasions</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Tap to pick the festive vibe</p>
          </div>
          <button 
            type="button"
            onClick={() => onNavigate('festive-categories')}
            className="font-label-md text-label-md text-primary flex items-center gap-0.5 font-bold hover:underline"
          >
            All (14) <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Scrollable Pills Carousel */}
        <div className="flex items-center gap-space-sm overflow-x-auto px-gutter-sm pb-space-xs no-scrollbar">
          {occasionsList.map((occ) => {
            const isSelected = selectedOccasion === occ.name;
            return (
              <button
                key={occ.name}
                type="button"
                onClick={() => handleOccasionClick(occ)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container'
                }`}
              >
                <span className="text-base">{occ.emoji}</span>
                <span className={`font-label-lg text-label-lg whitespace-nowrap ${isSelected ? 'text-on-primary font-semibold' : 'text-on-surface font-medium'}`}>
                  {occ.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE 3-STEP 'HOW IT WORKS' WIZARD HIGHLIGHT */}
      <section className="mt-space-lg px-gutter-sm">
        <div className="p-space-md rounded-2xl bg-surface-container-high relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-tertiary-container uppercase tracking-wider font-bold">
                Effortless Gifting
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">How GiftMate Works</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">psychology</span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
            Say goodbye to generic vouchers. We craft heartfelt smiles in 3 simple steps.
          </p>

          {/* Steps Stack */}
          <div className="flex flex-col gap-space-sm relative">
            {/* Connecting subtle gradient line */}
            <div className="absolute left-5 top-5 bottom-8 w-0.5 bg-outline-variant/50"></div>

            {/* Step 1 */}
            <div className="relative flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="relative z-10 w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md font-bold text-label-md shadow-sm">
                1
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">Share Who &amp; Why</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Select relationship, occasion, age group, and quirks or hobbies.
                </span>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[11px] font-label-md">Mom</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[11px] font-label-md">Tea Lover</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[11px] font-label-md">Milestone 50th</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="relative z-10 w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-md font-bold text-label-md shadow-sm">
                2
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">AI Matches in Seconds</span>
                  <span className="px-1.5 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-[10px]">Instant</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Emotional alignment algorithms scan 500+ top Indian artisan brands to rank winners.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-lowest shadow-sm">
              <div className="relative z-10 w-9 h-9 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center font-label-md font-bold text-label-md shadow-sm">
                3
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">Unwrap Pure Joy</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Festive royal packaging with custom wax seal &amp; handwritten calligraphy note.
                </span>
              </div>
            </div>
          </div>

          {/* Action Button inside How It Works */}
          <div className="mt-space-md">
            <button 
              type="button"
              onClick={() => onNavigate('ai-gift-finder')}
              className="w-full py-3 rounded-full bg-surface text-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-surface-dim transition-colors active:scale-95"
            >
              <span>Try 60-Second Gift Quiz</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* TRENDING GIFTS IN INDIA (PRODUCT CARDS) */}
      <section className="mt-space-lg px-gutter-sm" id="trending-section">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-secondary">local_fire_department</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Trending Gifts</h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Top-rated across Delhi, Mumbai &amp; Bengaluru</p>
          </div>
          <button 
            type="button"
            onClick={() => onNavigate('curated-recommendations')}
            className="font-label-md text-label-md text-primary font-bold hover:underline"
          >
            See All
          </button>
        </div>

        {/* Product Grid: 2-column mobile friendly */}
        <div className="grid grid-cols-2 gap-space-sm">
          {trendingProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={onOpenProductDetail} 
            />
          ))}
        </div>
      </section>

      {/* CUSTOMER LOVE & TESTIMONIALS */}
      <section className="mt-space-lg px-gutter-sm">
        <div className="flex flex-col text-center items-center mb-space-md">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md mb-1 font-semibold">
            <span className="material-symbols-outlined text-[16px]">favorite</span>
            <span>Real Stories of Joy</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Delivering Smiles Across India</h2>
        </div>

        {/* Testimonial Stack */}
        <div className="flex flex-col gap-space-sm">
          {/* Testimonial 1 */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-space-xs">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed-dim text-on-secondary flex items-center justify-center font-label-lg font-bold">
                  PK
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-bold">Priya &amp; Karthik</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px] text-tertiary">location_on</span>
                    Bengaluru, Karnataka
                  </span>
                </div>
              </div>
              <div className="flex text-tertiary-container">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface italic">
              “I was clueless for our 3rd anniversary. GiftMate asked me 4 questions about her love for indie coffee and pottery and recommended an engraved ceramic pour-over set. She cried happy tears!”
            </p>
            <span className="font-label-md text-[11px] text-primary font-bold mt-2">Occasion: 3rd Wedding Anniversary</span>
          </div>

          {/* Testimonial 2 */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-space-xs">
                <div className="w-9 h-9 rounded-full bg-primary-fixed-dim text-primary flex items-center justify-center font-label-lg font-bold">
                  AM
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-bold">Aman Mathur</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px] text-tertiary">location_on</span>
                    Bandra, Mumbai
                  </span>
                </div>
              </div>
              <div className="flex text-tertiary-container">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface italic">
              “Sent 12 Diwali hampers to clients across North India. The handwritten wax seal notes and express 36-hour delivery made us look so premium and thoughtful.”
            </p>
            <span className="font-label-md text-[11px] text-primary font-bold mt-2">Occasion: Diwali Corporate Gifting</span>
          </div>

          {/* Testimonial 3 */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-space-xs">
                <div className="w-9 h-9 rounded-full bg-tertiary-fixed text-tertiary-container flex items-center justify-center font-label-lg font-bold">
                  SG
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-bold">Simran Gupta</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px] text-tertiary">location_on</span>
                    South Delhi
                  </span>
                </div>
              </div>
              <div className="flex text-tertiary-container">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface italic">
              “Needed a last-minute 25th birthday surprise for my sister in Gurgaon. GiftMate delivered the warm LED frame in 24 hours. Flawless presentation!”
            </p>
            <span className="font-label-md text-[11px] text-primary font-bold mt-2">Occasion: Sister's 25th Birthday</span>
          </div>
        </div>
      </section>

      {/* FESTIVE FINAL CALL TO ACTION BANNER */}
      <section className="mt-space-lg px-gutter-sm">
        <div className="relative rounded-3xl overflow-hidden p-space-lg bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary shadow-xl">
          {/* Decorative Diwali Diya / Star ambient graphic SVG matching Stitch */}
          <svg className="absolute -right-10 -bottom-10 w-44 h-44 text-surface-variant/20 pointer-events-none" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="50" cy="50" opacity="0.3" r="40"></circle>
            <path d="M50 0 L58 35 L93 25 L68 50 L93 75 L58 65 L50 100 L42 65 L7 75 L32 50 L7 25 L42 35 Z" opacity="0.4"></path>
          </svg>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-center mb-space-sm text-tertiary-fixed">
              <span className="material-symbols-outlined text-[28px]">redeem</span>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary font-bold mb-2">
              Never Stress Over Gifts Again.
            </h2>
            <p className="font-body-md text-body-md text-inverse-on-surface/90 max-w-xs mb-space-md leading-relaxed">
              Let AI match the exact emotional frequency of your loved ones in 60 seconds.
            </p>
            <button 
              type="button"
              onClick={() => onNavigate('ai-gift-finder')}
              className="w-full max-w-xs py-3.5 px-6 rounded-full bg-surface text-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-surface-container active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary group-hover:rotate-45 transition-transform">
                auto_awesome
              </span>
              <span>Launch AI Gift Finder</span>
            </button>
            <div className="mt-space-sm flex items-center gap-space-sm text-[12px] text-inverse-on-surface/80 font-label-md">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">check_circle</span> 100% Free to Use
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">check_circle</span> No Signup Needed
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
