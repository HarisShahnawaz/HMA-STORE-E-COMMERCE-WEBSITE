import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SUGGESTED_QUESTIONS = [
  "What's on sale?",
  "New arrivals?",
  "AI picks?",
  "Kids clothing?",
];

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

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    // Create message history safely
    const newUserMessage = { from: "user", text: trimmed, time: new Date() };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch(`${API_URL}/api/assistant/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: updatedMessages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch response");
      }

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        { from: "bot", text: data.reply, time: new Date() },
      ]);
    } catch (error) {
      console.error("Assistant API Error:", error);
      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ HMA Assistant is a bit overwhelmed with requests right now! Our personal shoppers are currently fully booked. Please wait a moment and try asking again shortly.",
          time: new Date(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const formatText = (text) => {
    if (!text) return "";
    const lines = text.split("\n");
    return lines.map((line, index) => {
      let content = line;
      let isBullet = false;
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        content = line.trim().substring(2);
        isBullet = true;
      }
      const parts = content.split(/\*\*(.*?)\*\*/g);
      const parsedParts = parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-black text-black">{part}</strong> : part
      );
      if (isBullet) {
        return (
          <li key={index} className="ml-4 list-disc pl-1 my-1 text-gray-700">
            {parsedParts}
          </li>
        );
      }
      return (
        <p key={index} className={line.trim() === "" ? "h-2" : "my-0.5"}>
          {parsedParts}
        </p>
      );
    });
  };

  const formatTime = (date) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

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
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === "user"
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

          {/* Suggested Questions that appear */}
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