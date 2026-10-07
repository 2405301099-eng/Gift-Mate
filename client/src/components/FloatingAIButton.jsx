import React from 'react';

export default function FloatingAIButton({ onClick }) {
  return (
    <div className="fixed bottom-24 right-4 z-40">
      <button 
        type="button"
        aria-label="Ask GiftMate AI"
        onClick={onClick}
        className="relative flex items-center gap-space-xs pl-space-md pr-space-lg h-12 rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary shadow-[0_12px_30px_-4px_rgba(109,40,217,0.35)] hover:shadow-lg active:scale-95 transition-all group"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary-fixed-dim"></span>
        </span>
        <span className="material-symbols-outlined text-[20px] text-tertiary-fixed group-hover:rotate-12 transition-transform">
          auto_awesome
        </span>
        <span className="font-label-md text-label-md text-on-primary font-bold tracking-wide">
          Ask AI
        </span>
      </button>
    </div>
  );
}
