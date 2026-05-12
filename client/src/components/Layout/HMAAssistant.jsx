import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

const SUGGESTED_QUESTIONS = [
  "What's on sale?",
  "New arrivals?",
  "AI picks?",
  "Kids clothing?",
];

function getBotReply(message) {
  const msg = message.toLowerCase();
  if (msg.match(/sale|discount|offer|cheap/))
    return "🏷️ We have exclusive sale items! Head to our **Sale** section for discounted Men's, Women's, and Kids' clothing — up to 30% off!";
  if (msg.match(/new arrival|latest|new|fresh/))
    return "✨ Check our **New Arrivals** section for the freshest drops from Men, Women, and Kids collections!";
  if (msg.match(/ai|recommend|suggest|pick|stylist/))
    return "🤖 Our **AI Picks** are curated by our style engine! Look for the ✨ AI Pick badge — selected based on trending styles and top ratings.";
  if (msg.match(/men|man|male|gents/))
    return "👔 Our **Men's Collection** has 24 products — blazers, polos, hoodies, trousers and more. Ranging from Rs 1,200 to Rs 7,500!";
  if (msg.match(/women|woman|female|ladies/))
    return "👗 Our **Women's Collection** has 21 pieces — dresses, coats, bags, earrings and more. Ranging from Rs 1,200 to Rs 8,500!";
  if (msg.match(/kid|child|children|boy|baby/))
    return "🧒 Our **Kids Collection** has 22 items — jackets, hoodies, sets, shoes and more. Ranging from Rs 800 to Rs 4,900!";
  if (msg.match(/price|cost|how much|range|budget/))
    return "💰 Prices range from **Rs 800 to Rs 8,500**. Men's: Rs 1,200–7,500 | Women's: Rs 1,200–8,500 | Kids: Rs 800–4,900.";
  if (msg.match(/delivery|shipping|ship|deliver/))
    return "🚚 **Free delivery** on orders over Rs 30,000. We deliver across Pakistan!";
  if (msg.match(/return|exchange|refund/))
    return "↩️ **Easy returns within 7 days**. We want you to be 100% satisfied!";
  if (msg.match(/payment|pay|cash|card|online/))
    return "💳 We accept **cash on delivery** and **online payment**. Shop with confidence!";
  if (msg.match(/size|fit|measurement/))
    return "📏 We offer sizes **XS, S, M, L, XL, XXL**. Check the size guide on each product page!";
  if (msg.match(/hello|hi|hey|greet/))
    return "👋 Welcome to **HMA-Store**! I can help with products, shipping, returns, or pricing. What are you looking for?";
  if (msg.match(/thank|thanks/))
    return "😊 You're welcome! Happy shopping at HMA-Store!";
  if (msg.match(/cart|bag|checkout|order/))
    return "🛒 Add items from any product page, then head to **Cart** to checkout!";
  if (msg.match(/product|item|collection|how many/))
    return "🛍️ We have **67 products** across Men, Women, and Kids! Use filters to find exactly what you need.";
  if (msg.match(/contact|help|support/))
    return "📞 Visit the **Contact** section on our homepage. We're happy to help!";
  return "🤔 I can help with **products**, **prices**, **sale items**, **new arrivals**, **shipping**, or **returns**. What would you like to know?";
}

export default function HMAAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I'm **HMA Assistant** — your personal style guide. Ask me anything about products, prices, shipping, or returns!",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const { cartCount } = useCart();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (open && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sendMessage = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { from: "user", text: trimmed, time: new Date() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: getBotReply(trimmed), time: new Date() }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const formatText = (text) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-black text-black">{part}</strong> : part
    );

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* ── Backdrop — closes on click, both mobile and desktop ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Floating Button ── */}
{!open && (
  <button
    onClick={() => setOpen(true)}
    style={{
      position: "fixed",
      bottom: "24px",
      right: "20px",
      zIndex: 9999,
      width: "52px",
      height: "52px",
      borderRadius: "50%",
      backgroundColor: "#000",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      border: "none",
      cursor: "pointer",
    }}
  >
    <Sparkles size={20} fill="currentColor" />
    {cartCount > 0 && (
      <span style={{
        position: "absolute",
        top: "-4px",
        right: "-4px",
        width: "20px",
        height: "20px",
        backgroundColor: "#ef4444",
        color: "#fff",
        fontSize: "9px",
        fontWeight: "900",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid white",
      }}>
        {cartCount}
      </span>
    )}
  </button>
)}

      {/* ── Chat Dialog ── */}
      <div
  style={{ zIndex: 9998 }}
  className={`fixed transition-all duration-300 ease-out
    bottom-0 right-0 left-0 
    md:bottom-6 md:right-6 md:left-auto
    ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-full pointer-events-none"}
  `}
>
        <div className="
  w-full h-[72dvh] rounded-t-3xl
  md:w-90 md:h-130 md:rounded-3xl
  bg-white shadow-2xl flex flex-col overflow-hidden
  border border-gray-100
">

          {/* Header */}
          <div className="bg-[#0f172a] px-5 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-white" fill="currentColor" />
              </div>
              <div>
                <p className="font-serif font-black text-white text-sm leading-tight">HMA Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f8f9fa]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "bot" && (
                  <div className="w-6 h-6 bg-[#0f172a] rounded-lg flex items-center justify-center mr-2 shrink-0 mt-1">
                    <Sparkles size={10} className="text-white" fill="currentColor" />
                  </div>
                )}
                <div className={`max-w-[80%] flex flex-col gap-1 ${msg.from === "user" ? "items-end" : "items-start"}`}>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-black text-white rounded-tr-sm"
                      : "bg-white text-gray-700 rounded-tl-sm shadow-sm border border-gray-100"
                  }`}>
                    {formatText(msg.text)}
                  </div>
                  <span className="text-[10px] text-gray-400 px-1">{formatTime(msg.time)}</span>
                </div>
              </div>
            ))}

            {/* Typing */}
            {typing && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#0f172a] rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles size={10} className="text-white" fill="currentColor" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 pt-1 bg-[#f8f9fa] flex gap-2 overflow-x-auto shrink-0"
              style={{ scrollbarWidth: "none" }}>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)}
                  className="shrink-0 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-[11px] font-bold text-gray-600 hover:border-black hover:text-black transition-all whitespace-nowrap">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
            <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-black transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
              <ShoppingBag size={13} className="text-gray-300 shrink-0" />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="w-9 h-9 bg-black text-white rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}