import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { matchGifts } from '../api/client';
import { formatINR } from '../utils/currency';

export default function AIGiftFinder({ onNavigate, onOpenProductDetail }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    recipient: 'Mom',
    customRecipient: '',
    occasion: 'Diwali',
    ageGroup: '30-45',
    interests: ['Tea Lover', 'Memories'],
    budget: 2000,
    pincode: '110001',
    note: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const recipientOptions = ['Mom', 'Dad', 'Wife', 'Husband', 'Sister', 'Brother', 'Friend', 'Boss / Colleague', 'In-Laws', 'Wedding Couple'];
  const occasionOptions = ['Diwali & Festivals', 'Birthday', 'Anniversary', 'Wedding', 'Farewell & Work', 'Housewarming', 'Valentine’s Day'];
  const ageOptions = ['Under 18 (Teen)', '18 - 29 (Young Adult)', '30 - 49 (Prime)', '50+ (Elders & Parents)'];
  const interestTags = [
    'Tea Lover', 'Coffee Enthusiast', 'Memories & Keepsakes', 'Artisanal Fragrance', 
    'Gourmet Chocolates', 'Smart Tech', 'Aesthetic Home Decor', 'Traditional Weaves', 
    'Wellness & Spa', 'Spiritual & Auspicious'
  ];
  const budgetOptions = [500, 1000, 1500, 2000, 3500, 5000];

  const handleInterestToggle = (tag) => {
    setFormData(prev => {
      const exists = prev.interests.includes(tag);
      return {
        ...prev,
        interests: exists 
          ? prev.interests.filter(t => t !== tag)
          : [...prev.interests, tag]
      };
    });
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      runAIMatch();
    }
  };

  const runAIMatch = async () => {
    setIsLoading(true);
    setCurrentStep(3);
    try {
      const res = await matchGifts(formData);
      setResults(res.results || []);
    } catch (err) {
      console.error('Match failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setResults(null);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-gutter-sm max-w-3xl mx-auto pt-space-sm">
      {/* Page Title & AI Header */}
      <div className="text-center mb-space-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold mb-2 shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
            magic_button
          </span>
          <span>AI Gift Matcher Engine</span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
          Find the Perfect Gift in 60 Seconds
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mt-1">
          Emotional AI calculates 12+ compatibility factors to find gifts that evoke genuine smiles.
        </p>
      </div>

      {/* STEPPER TRACK */}
      <div className="relative mb-space-lg px-space-md">
        {/* Track Line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-surface-container-highest rounded-full z-0">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: currentStep === 1 ? '10%' : currentStep === 2 ? '55%' : '100%' }}
          />
        </div>

        {/* Step Nodes */}
        <div className="relative z-10 flex justify-between">
          {/* Step 1 Node */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-label-md font-bold text-[14px] transition-all shadow-sm ${
              currentStep > 1 
                ? 'bg-primary text-on-primary' 
                : currentStep === 1 
                  ? 'bg-primary text-on-primary ring-4 ring-primary/20 scale-110' 
                  : 'bg-surface-container text-on-surface-variant'
            }`}>
              {currentStep > 1 ? <span className="material-symbols-outlined text-[20px]">check</span> : '1'}
            </div>
            <span className="font-label-md text-[11px] font-semibold mt-1.5 text-on-surface">Recipient</span>
          </div>

          {/* Step 2 Node */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-label-md font-bold text-[14px] transition-all shadow-sm ${
              currentStep > 2 
                ? 'bg-secondary text-on-secondary' 
                : currentStep === 2 
                  ? 'bg-secondary text-on-secondary ring-4 ring-secondary/20 scale-110' 
                  : 'bg-surface-container text-on-surface-variant'
            }`}>
              {currentStep > 2 ? <span className="material-symbols-outlined text-[20px]">check</span> : '2'}
            </div>
            <span className="font-label-md text-[11px] font-semibold mt-1.5 text-on-surface">Budget &amp; Vibe</span>
          </div>

          {/* Step 3 Node */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-label-md font-bold text-[14px] transition-all shadow-sm ${
              currentStep === 3 
                ? 'bg-tertiary-container text-on-tertiary ring-4 ring-tertiary-container/20 scale-110' 
                : 'bg-surface-container text-on-surface-variant'
            }`}>
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <span className="font-label-md text-[11px] font-semibold mt-1.5 text-on-surface">AI Results</span>
          </div>
        </div>
      </div>

      {/* STEP 1: WHO & WHY */}
      {currentStep === 1 && (
        <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-3xl p-space-md sm:p-space-lg shadow-md border border-outline-variant/30 animate-fadeIn">
          <div className="mb-space-md">
            <span className="font-label-md text-[12px] text-tertiary-container uppercase tracking-wider font-bold">
              Step 1 of 2
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Who are you celebrating?
            </h2>
          </div>

          {/* Recipient Selection */}
          <div className="mb-space-md">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold mb-2">
              Relationship / Recipient
            </label>
            <div className="flex flex-wrap gap-2">
              {recipientOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, recipient: item }))}
                  className={`px-3.5 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                    formData.recipient === item
                      ? 'bg-primary text-on-primary shadow-sm font-bold'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Selection */}
          <div className="mb-space-md">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold mb-2">
              What is the festive occasion?
            </label>
            <div className="flex flex-wrap gap-2">
              {occasionOptions.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, occasion: occ }))}
                  className={`px-3.5 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                    formData.occasion === occ
                      ? 'bg-secondary text-on-secondary shadow-sm font-bold'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group */}
          <div className="mb-space-md">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold mb-2">
              Age Bracket
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ageOptions.map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, ageGroup: age }))}
                  className={`p-2.5 rounded-xl font-label-md text-[13px] text-left transition-all ${
                    formData.ageGroup === age
                      ? 'bg-primary-fixed text-on-primary-fixed border border-primary font-bold'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-transparent'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* Hobbies / Quirks */}
          <div className="mb-space-lg">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold mb-1">
              Select Recipient's Quirks &amp; Passions
            </label>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">
              Tap any tags that resonate with their personality:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {interestTags.map((tag) => {
                const selected = formData.interests.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleInterestToggle(tag)}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-[12px] transition-all flex items-center gap-1 ${
                      selected
                        ? 'bg-surface-container-highest text-primary border border-primary font-bold'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30'
                    }`}
                  >
                    <span>{tag}</span>
                    {selected && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-label-lg text-label-lg font-bold shadow-lg shadow-primary-container/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>Proceed to Budget &amp; Delivery</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      )}

      {/* STEP 2: BUDGET & DELIVERY */}
      {currentStep === 2 && (
        <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-3xl p-space-md sm:p-space-lg shadow-md border border-outline-variant/30 animate-fadeIn">
          <div className="mb-space-md">
            <span className="font-label-md text-[12px] text-tertiary-container uppercase tracking-wider font-bold">
              Step 2 of 2
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Budget &amp; Delivery Preferences
            </h2>
          </div>

          {/* Budget Selector */}
          <div className="mb-space-md">
            <div className="flex items-center justify-between mb-2">
              <label className="font-label-lg text-label-lg text-on-surface font-semibold">
                Maximum Budget Limit:
              </label>
              <span className="font-price-headline text-price-headline text-secondary font-bold">
                {formatINR(formData.budget)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {budgetOptions.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, budget: amt }))}
                  className={`py-2 rounded-xl font-label-md text-[13px] font-bold transition-all ${
                    formData.budget === amt
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  Under {formatINR(amt)}
                </button>
              ))}
            </div>

            <input 
              type="range"
              min={500}
              max={5000}
              step={100}
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
              className="w-full accent-secondary cursor-pointer"
            />
          </div>

          {/* Indian PIN Code for Express Dispatch */}
          <div className="mb-space-md">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold mb-1">
              Delivery PIN Code (Optional)
            </label>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">
              We verify 24h &amp; 48h express dispatch to your recipient's city.
            </p>
            <div className="flex items-center gap-2">
              <input 
                type="text"
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '') }))}
                placeholder="e.g. 110001, 560001"
                className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/60 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary"
              />
              <span className="text-sm font-label-md text-primary font-bold px-3 py-2 bg-surface-container rounded-xl">
                🇮🇳 Pan-India
              </span>
            </div>
          </div>

          {/* Custom Note or Wish */}
          <div className="mb-space-lg">
            <label className="block font-label-lg text-label-lg text-on-surface font-semibold mb-1">
              Personal Note or Secret Clue
            </label>
            <textarea
              rows={2}
              placeholder="e.g. She loves cozy tea rituals and sentimental wooden photo art..."
              value={formData.note}
              onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/60 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Action Row */}
          <div className="flex gap-space-sm">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="py-3 px-5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={runAIMatch}
              className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary font-label-lg text-label-lg font-bold shadow-lg shadow-primary-container/25 flex items-center justify-center gap-2 active:scale-95 transition-all group"
            >
              <span className="material-symbols-outlined text-[20px] text-tertiary-fixed group-hover:rotate-12 transition-transform">
                auto_awesome
              </span>
              <span>Calculate AI Matches</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: RESULTS / LOADING */}
      {currentStep === 3 && (
        <div className="animate-fadeIn">
          {isLoading ? (
            <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-3xl p-space-xl shadow-md border border-outline-variant/30 text-center flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-md animate-bounce">
                <span className="material-symbols-outlined text-[32px] animate-spin">auto_awesome</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                Consulting GiftMate Emotional AI...
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
                Evaluating {formData.recipient}’s vibe for {formData.occasion} across 500+ Indian artisan workshops...
              </p>
            </div>
          ) : (
            <div>
              {/* Results Summary Bar */}
              <div className="p-space-md rounded-2xl bg-surface-container-high mb-space-md flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">celebration</span>
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      {results?.length || 0} Tailored Matches Found
                    </span>
                  </div>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">
                    For {formData.recipient} • {formData.occasion} • Under {formatINR(formData.budget)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-1.5 rounded-full bg-surface text-primary font-label-md text-[12px] font-bold shadow-sm hover:bg-surface-container transition-colors"
                >
                  Adjust Quiz
                </button>
              </div>

              {/* Recommended Cards Grid */}
              <div className="grid grid-cols-2 gap-space-sm sm:gap-space-md">
                {results?.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onViewDetails={onOpenProductDetail} 
                    showMatchScore={true}
                  />
                ))}
              </div>

              {/* Follow-up CTA */}
              <div className="mt-space-lg p-space-md rounded-2xl bg-surface-container text-center">
                <p className="font-body-md text-body-md text-on-surface mb-space-sm">
                  Want more specific ideas or customized packaging?
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('ai-conversation')}
                  className="py-2.5 px-6 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-primary-container active:scale-95 transition-all"
                >
                  Chat with GiftMate AI Assistant
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
