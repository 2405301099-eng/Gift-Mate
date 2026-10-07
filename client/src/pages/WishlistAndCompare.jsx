import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';

export default function WishlistAndCompare({ onNavigate, onOpenProductDetail }) {
  const { wishlistItems, removeItem, wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState('compare'); // 'compare' or 'wishlist'
  const [testPin, setTestPin] = useState('110001');

  return (
    <div className="flex flex-col w-full pb-28 px-gutter-sm max-w-5xl mx-auto pt-space-sm">
      {/* Header */}
      <div className="mb-space-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold mb-1 shadow-sm">
          <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
          <span>Saved &amp; Compare Matrix</span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
          Wishlist &amp; Comparison Matrix
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Side-by-side evaluation of presentation elegance, personalization, and delivery speed across India.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-full bg-surface-container-high w-fit mb-space-md shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab('compare')}
          className={`px-5 py-2 rounded-full font-label-md text-label-md font-bold transition-all ${
            activeTab === 'compare'
              ? 'bg-surface text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Comparison Matrix
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('wishlist')}
          className={`px-5 py-2 rounded-full font-label-md text-label-md font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'wishlist'
              ? 'bg-surface text-secondary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span>Saved Gifts</span>
          <span className="px-1.5 py-0.2 rounded-full bg-secondary text-on-secondary text-[11px] font-bold">
            {wishlistCount}
          </span>
        </button>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="p-space-xl rounded-3xl bg-surface-container-lowest text-center border border-outline-variant/30 shadow-sm my-8">
          <div className="w-16 h-16 rounded-full bg-secondary-fixed-dim/40 text-secondary mx-auto flex items-center justify-center mb-space-sm">
            <span className="material-symbols-outlined text-[32px]">favorite_border</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">
            Your Wishlist is Empty
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto mb-space-md">
            Tap the heart icon on any gift to save it here for side-by-side comparisons.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('home-discovery')}
            className="py-3 px-6 rounded-full bg-primary text-on-primary font-label-lg font-bold shadow-md hover:bg-primary-container active:scale-95 transition-all"
          >
            Explore Trending Gifts
          </button>
        </div>
      ) : activeTab === 'compare' ? (
        /* COMPARISON MATRIX TABLE matching DESIGN.md */
        <div className="flex flex-col gap-space-md">
          {/* PIN code test bar */}
          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
              <span className="font-label-md text-[13px] text-on-surface font-semibold">
                Estimating for PIN Code:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                maxLength={6}
                value={testPin} 
                onChange={(e) => setTestPin(e.target.value)}
                className="w-24 px-2.5 py-1 rounded-lg bg-surface border border-outline-variant/50 font-label-md text-[13px] text-on-surface text-center font-bold"
              />
              <span className="text-[11px] text-primary font-bold">Metro Express</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-outline-variant/30 shadow-sm bg-surface-container-lowest/80 backdrop-blur-md">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-high/60">
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant w-44 sticky left-0 bg-surface-container-high z-10">
                    Feature
                  </th>
                  {wishlistItems.map((prod) => (
                    <th key={prod.id} className="p-4 min-w-[200px]">
                      <div className="flex flex-col items-center text-center">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-20 h-20 rounded-xl object-cover mb-2 shadow-sm"
                        />
                        <span className="font-label-md text-[13px] text-on-surface font-bold line-clamp-2">
                          {prod.name}
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-price-headline text-[16px] text-primary font-bold">
                            {formatINR(prod.price)}
                          </span>
                          {prod.originalPrice && (
                            <span className="text-[11px] text-outline line-through">
                              {formatINR(prod.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {/* Row 1: Presentation Score */}
                <tr className="hover:bg-surface-container-low/50">
                  <td className="p-4 font-label-md text-on-surface-variant font-semibold sticky left-0 bg-surface-container-lowest/95 z-10">
                    Presentation Score
                  </td>
                  {wishlistItems.map((prod) => (
                    <td key={prod.id} className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[12px] font-bold">
                        ⭐ {prod.presentationScore || '9.5'} / 10
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Row 2: Wax Seal & Handwritten Note */}
                <tr className="hover:bg-surface-container-low/50">
                  <td className="p-4 font-label-md text-on-surface-variant font-semibold sticky left-0 bg-surface-container-lowest/95 z-10">
                    Wax Seal &amp; Note
                  </td>
                  {wishlistItems.map((prod) => (
                    <td key={prod.id} className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-primary font-label-md text-[12px] font-bold">
                        <span className="material-symbols-outlined text-[18px] text-tertiary">verified</span>
                        Included Free
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Row 3: Delivery Speed */}
                <tr className="hover:bg-surface-container-low/50">
                  <td className="p-4 font-label-md text-on-surface-variant font-semibold sticky left-0 bg-surface-container-lowest/95 z-10">
                    Delivery to {testPin}
                  </td>
                  {wishlistItems.map((prod) => (
                    <td key={prod.id} className="p-4 text-center font-label-md text-[12px] text-on-surface">
                      <span className="font-bold text-secondary">{prod.fastDeliveryHours || 24} Hours</span>
                      <span className="block text-[10px] text-on-surface-variant">Bluedart Express Air</span>
                    </td>
                  ))}
                </tr>

                {/* Row 4: Personalization Depth */}
                <tr className="hover:bg-surface-container-low/50">
                  <td className="p-4 font-label-md text-on-surface-variant font-semibold sticky left-0 bg-surface-container-lowest/95 z-10">
                    Personalization
                  </td>
                  {wishlistItems.map((prod) => (
                    <td key={prod.id} className="p-4 text-center font-body-sm text-[12px] text-on-surface-variant">
                      {prod.personalizationDepth || 'Medium (Custom Card)'}
                    </td>
                  ))}
                </tr>

                {/* Row 5: Rating */}
                <tr className="hover:bg-surface-container-low/50">
                  <td className="p-4 font-label-md text-on-surface-variant font-semibold sticky left-0 bg-surface-container-lowest/95 z-10">
                    Customer Rating
                  </td>
                  {wishlistItems.map((prod) => (
                    <td key={prod.id} className="p-4 text-center font-label-md text-[13px] text-on-surface font-bold">
                      ⭐ {prod.rating} ({prod.reviewCount ? (prod.reviewCount > 999 ? `${(prod.reviewCount/1000).toFixed(1)}k` : prod.reviewCount) : '750'})
                    </td>
                  ))}
                </tr>

                {/* Row 6: Actions */}
                <tr className="bg-surface-container-low/30">
                  <td className="p-4 font-label-md text-on-surface-variant font-semibold sticky left-0 bg-surface-container-lowest/95 z-10">
                    Actions
                  </td>
                  {wishlistItems.map((prod) => (
                    <td key={prod.id} className="p-4 text-center">
                      <div className="flex flex-col gap-1.5 items-center">
                        <button
                          type="button"
                          onClick={() => onOpenProductDetail(prod)}
                          className="w-full py-1.5 px-3 rounded-full bg-primary text-on-primary font-label-md text-[12px] font-bold shadow-sm hover:bg-primary-container"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(prod.id)}
                          className="text-[11px] text-error hover:underline font-label-md"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* WISHLIST ITEMS LIST */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm sm:gap-space-md">
          {wishlistItems.map((prod) => (
            <div 
              key={prod.id}
              className="p-space-sm rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex gap-space-sm items-center"
            >
              <img 
                src={prod.image} 
                alt={prod.name} 
                className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <span className="font-label-md text-[10px] text-primary font-bold uppercase tracking-wider block">
                    {prod.categoryName || 'Festive Pick'}
                  </span>
                  <h3 className="font-label-lg text-label-lg text-on-surface font-semibold line-clamp-1">
                    {prod.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-price-headline text-price-headline text-secondary font-bold">
                      {formatINR(prod.price)}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[12px] text-outline line-through">
                        {formatINR(prod.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => onOpenProductDetail(prod)}
                    className="px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-[12px] font-bold hover:bg-primary hover:text-on-primary transition-colors"
                  >
                    View Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(prod.id)}
                    className="p-1.5 rounded-full text-on-surface-variant hover:text-error transition-colors"
                    title="Remove from wishlist"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
