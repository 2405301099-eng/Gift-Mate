import React, { useState, useEffect, useRef } from 'react';
import { sendAIChat } from '../api/client';
import { formatINR } from '../utils/currency';

export default function AIConversation({ onNavigate, onOpenProductDetail }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Namaste! I am your GiftMate AI Festive Assistant. Tell me who you want to delight (e.g. your sister, parents, in-laws, colleague), the special occasion, or your budget!',
      products: [],
      quickFollowUps: [
        'Suggest a Diwali gift under ₹1500',
        'Heartfelt anniversary gift for wife',
        'Unique tech gift for brother',
        'How does the custom wax seal work?'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await sendAIChat(text.trim());
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: res.reply || "Here are our top curated gifts matching your request:",
        products: res.products || [],
        quickFollowUps: res.quickFollowUps || ['Under ₹1000 gifts', 'Show more options', 'Diwali specials']
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I couldn't reach the server, but I recommend checking out our Curated Luxury Hampers or Personalized LED Frame!",
        products: [],
        quickFollowUps: ['Show trending gifts', 'Diwali hampers']
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 px-gutter-sm max-w-2xl mx-auto pt-space-xs h-[calc(100vh-8rem)]">
      {/* Header bar */}
      <div className="p-space-sm rounded-2xl bg-surface-container-high mb-space-sm flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-container to-secondary flex items-center justify-center text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
          </div>
          <div>
            <h2 className="font-label-lg text-label-lg text-on-surface font-bold leading-tight">
              GiftMate AI Assistant
            </h2>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">Online • Indian Gifting Expert</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('home-discovery')}
          className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-1 py-space-xs flex flex-col gap-space-sm no-scrollbar">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[90%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
          >
            {/* Bubble */}
            <div className={`p-3.5 rounded-2xl ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-br-none shadow-sm'
                : 'bg-surface-container-lowest text-on-surface rounded-bl-none shadow-md border border-outline-variant/30'
            }`}>
              <p className="font-body-md text-[14px] leading-relaxed whitespace-pre-line">
                {msg.text}
              </p>

              {/* Product cards inside message */}
              {msg.products && msg.products.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  {msg.products.map((prod) => (
                    <div 
                      key={prod.id}
                      onClick={() => onOpenProductDetail(prod)}
                      className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center gap-2.5 transition-colors cursor-pointer border border-outline-variant/30"
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-label-md text-[12px] font-bold text-on-surface line-clamp-1">
                          {prod.name}
                        </span>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="font-price-headline text-[13px] text-primary font-bold">
                            {formatINR(prod.price)}
                          </span>
                          <span className="text-[11px] text-secondary font-bold flex items-center gap-0.5">
                            View <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Follow-up chips for AI messages */}
            {msg.sender === 'ai' && msg.quickFollowUps && msg.quickFollowUps.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {msg.quickFollowUps.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(chip)}
                    className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-[11px] hover:bg-primary hover:text-on-primary transition-colors border border-outline-variant/20 active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/30 w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            <span className="font-body-sm text-[12px] text-on-surface-variant ml-1">GiftMate is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input row */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="mt-space-xs flex items-center gap-2 p-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/50 shadow-md flex-shrink-0"
      >
        <input 
          type="text"
          placeholder="Ask for advice, budget ideas, or occasion gifts..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-4 py-2 bg-transparent font-body-md text-body-md text-on-surface focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container active:scale-90 transition-all disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </form>
    </div>
  );
}
