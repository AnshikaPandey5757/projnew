import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareCode,
  Send,
  X,
  Sparkles,
  ShieldCheck,
  IndianRupee,
  AlertTriangle,
  FileText,
  Calculator,
  HelpCircle,
  MapPin,
  ArrowRight,
  Clipboard,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import lendingService from "../../services/lendingService";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi there! I'm LooPy, your TrustLoop AI Concierge. I can help you find nearby items, calculate safe deposits, draft lending agreements, or answer support questions. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Load actual items from DB to perform real smart local search/matching
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const items = await lendingService.getListings();
        setListings(items || []);
      } catch (err) {
        console.error("Error loading listings in chatbot:", err);
      }
    };
    fetchListings();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    // AI Response Logic
    setTimeout(async () => {
      let botResponse = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        timestamp: new Date(),
      };

      const normalizedQuery = query.toLowerCase();

      // 1. Hyperlocal Match Query
      if (
        normalizedQuery.includes("find") ||
        normalizedQuery.includes("borrow") ||
        normalizedQuery.includes("camera") ||
        normalizedQuery.includes("drone") ||
        normalizedQuery.includes("tent") ||
        normalizedQuery.includes("nearby") ||
        normalizedQuery.includes("list") ||
        normalizedQuery.includes("search")
      ) {
        // Find matching items from DB
        let matches = [];
        if (normalizedQuery.includes("camera") || normalizedQuery.includes("dslr")) {
          matches = listings.filter((item) =>
            item.title.toLowerCase().includes("camera") || item.title.toLowerCase().includes("eos")
          );
        } else if (normalizedQuery.includes("drone") || normalizedQuery.includes("dji")) {
          matches = listings.filter((item) =>
            item.title.toLowerCase().includes("drone") || item.title.toLowerCase().includes("dji")
          );
        } else if (normalizedQuery.includes("tent") || normalizedQuery.includes("camp")) {
          matches = listings.filter((item) =>
            item.title.toLowerCase().includes("tent") || item.title.toLowerCase().includes("quechua")
          );
        } else {
          // General matching: look for words matching title or category
          const words = normalizedQuery.split(" ");
          matches = listings.filter((item) =>
            words.some(
              (w) =>
                w.length > 2 &&
                (item.title.toLowerCase().includes(w) ||
                  item.category.toLowerCase().includes(w) ||
                  item.location.toLowerCase().includes(w))
            )
          );
        }

        // Fallback to general listings if no specific match
        if (matches.length === 0 && listings.length > 0) {
          matches = listings.slice(0, 2);
        }

        if (matches.length > 0) {
          botResponse.text = `I found ${matches.length} matching item(s) near you:`;
          botResponse.type = "listings";
          botResponse.data = matches;
        } else {
          botResponse.text =
            "I couldn't find any exact item matches nearby. However, you can publish a request on the dashboard or check our full Discovery feed below!";
          botResponse.type = "cta_discovery";
        }
      }

      // 2. Rent / Deposit Risk Calculator
      else if (
        normalizedQuery.includes("deposit") ||
        normalizedQuery.includes("calculator") ||
        normalizedQuery.includes("calculate") ||
        normalizedQuery.includes("rent") ||
        normalizedQuery.includes("cost") ||
        normalizedQuery.includes("price") ||
        normalizedQuery.includes("fee")
      ) {
        // Try parsing item value
        const valMatch = normalizedQuery.match(/\d+/g);
        const itemVal = valMatch ? parseInt(valMatch[0]) : 15000; // default 15000 Rs

        const recommendedDaily = Math.round(itemVal * 0.02); // 2% daily rate
        const recommendedDeposit = Math.round(itemVal * 0.4); // 40% security deposit (lower with trust verification)
        const safetyFactor = "High (Verified member protection active)";

        botResponse.text = `Here is my safe lending breakdown for an item valued at ₹${itemVal.toLocaleString()}:`;
        botResponse.type = "calculator";
        botResponse.data = {
          value: itemVal,
          daily: recommendedDaily,
          deposit: recommendedDeposit,
          safety: safetyFactor,
        };
      }

      // 3. Agreement Generator
      else if (
        normalizedQuery.includes("agreement") ||
        normalizedQuery.includes("contract") ||
        normalizedQuery.includes("draft") ||
        normalizedQuery.includes("terms") ||
        normalizedQuery.includes("rule")
      ) {
        const agreementText = `TRUSTLOOP LOCAL LENDING AGREEMENT
-----------------------------------------
Lender: [Verified Member]
Borrower: [Verified Member]
Item Name: Camera/Drone/Camping Gear
Security Deposit: ₹4,000 (Protected in TrustLoop Vault)
Lending Period: 3 Days
-----------------------------------------
TERMS & CONDITIONS:
1. The Borrower agrees to return the item in the identical condition received.
2. AI Verification Condition Scans are required before and after the lending.
3. In case of minor damages, the cost of repair is deducted from the security deposit.
4. Late return fee of ₹500/day applies unless mutually agreed.`;

        botResponse.text = "Here is a standard local lending agreement draft for your transaction:";
        botResponse.type = "agreement";
        botResponse.data = agreementText;
      }

      // 4. Policy Q&A
      else if (
        normalizedQuery.includes("trust") ||
        normalizedQuery.includes("score") ||
        normalizedQuery.includes("how") ||
        normalizedQuery.includes("work") ||
        normalizedQuery.includes("security") ||
        normalizedQuery.includes("safe") ||
        normalizedQuery.includes("dispute") ||
        normalizedQuery.includes("damage")
      ) {
        botResponse.text = `TrustLoop secures peer-to-peer lending through three pillars:
1. **AI Condition Reports**: Capture photos before and after lending. Our AI compares reports and flags damages automatically to prevent disputes.
2. **Dynamic Trust Score**: Your score increases with verified ID, verified phone, linking socials, and successful lending history.
3. **Escrow Security Deposit**: The deposit is held securely by TrustLoop and automatically refunded once the item is confirmed returned without damage.`;
        botResponse.type = "info";
      }

      // 5. Default Friendly Q&A
      else {
        botResponse.text =
          "I want to make sure I assist you correctly! Try selecting one of the quick actions below, or ask me something like 'Find a camera nearby' or 'How much deposit for a ₹20,000 item?'.";
      }

      setMessages((prev) => [...prev, botResponse]);
      setLoading(false);
    }, 750);
  };

  const handleQuickAction = (actionText) => {
    handleSend(actionText);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 rounded-full flex items-center justify-center text-slate-950 font-semibold shadow-[0_0_25px_rgba(0,229,204,0.3)] bg-gradient-to-tr from-[#00E5CC] to-[#FFB347] transition-all"
          aria-label="Toggle LooPy AI Support Chatbot"
        >
          <div className="absolute inset-0.5 rounded-full bg-slate-950 flex items-center justify-center text-white hover:text-[#00E5CC] transition-colors">
            {isOpen ? <X size={26} /> : <MessageSquareCode size={26} />}
          </div>
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 animate-pulse border-2 border-slate-950" />
          )}
        </motion.button>
      </div>

      {/* Slide-out Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] rounded-[32px] border border-white/10 bg-[#0B0F1A]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#00E5CC]/10 border border-[#00E5CC]/25 flex items-center justify-center text-[#00E5CC]">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-syne font-bold text-lg flex items-center gap-2">
                    LooPy AI Concierge
                  </h3>
                  <p className="text-[#00E5CC] text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] animate-ping" />
                    Online & Active
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[24px] px-5 py-3 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#00E5CC] text-slate-950 font-medium rounded-tr-sm"
                        : "bg-white/5 border border-white/5 text-gray-200 rounded-tl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Interactive listings message */}
                    {msg.type === "listings" && msg.data && (
                      <div className="mt-4 space-y-3">
                        {msg.data.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-[#00E5CC]/20 transition flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={item.images?.[0] || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"}
                                alt={item.title}
                                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="text-white font-semibold text-xs truncate">
                                  {item.title}
                                </h4>
                                <p className="text-gray-400 text-[10px] flex items-center gap-1">
                                  <MapPin size={10} className="text-[#00E5CC]" />
                                  {item.location}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-[#00E5CC] font-bold text-xs">
                                ₹{item.deposit}
                              </span>
                              <button
                                onClick={() => {
                                  setIsOpen(false);
                                  navigate(`/item/${item.id}`);
                                }}
                                className="mt-1 block text-[10px] px-2.5 py-1 rounded-lg bg-[#00E5CC]/15 border border-[#00E5CC]/20 text-[#00E5CC] hover:bg-[#00E5CC] hover:text-slate-950 transition font-semibold"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Rent Calculator Breakdown */}
                    {msg.type === "calculator" && msg.data && (
                      <div className="mt-4 p-4 rounded-2xl bg-slate-950/40 border border-white/5 space-y-3">
                        <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                          <span className="text-gray-400">Valuation:</span>
                          <span className="text-white font-bold">₹{msg.data.value.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                          <span className="text-gray-400">Daily Rental Fee:</span>
                          <span className="text-[#FFB347] font-bold">₹{msg.data.daily}/day</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                          <span className="text-gray-400">Security Deposit:</span>
                          <span className="text-[#00E5CC] font-bold">₹{msg.data.deposit}</span>
                        </div>
                        <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <ShieldCheck size={12} />
                          {msg.data.safety}
                        </div>
                      </div>
                    )}

                    {/* Agreement Text Block */}
                    {msg.type === "agreement" && msg.data && (
                      <div className="mt-4 space-y-3">
                        <pre className="p-3 rounded-2xl bg-slate-950 text-[10px] font-mono text-gray-400 max-h-[150px] overflow-y-auto border border-white/5 whitespace-pre-wrap">
                          {msg.data}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(msg.data, index)}
                          className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold hover:bg-white/10 transition"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check size={14} className="text-emerald-400" /> Copied Agreement!
                            </>
                          ) : (
                            <>
                              <Clipboard size={14} /> Copy Draft Agreement
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Call to action for full search feed */}
                    {msg.type === "cta_discovery" && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          document.getElementById("discovery-feed")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="mt-3 w-full py-2 bg-[#00E5CC]/15 border border-[#00E5CC]/25 text-[#00E5CC] hover:bg-[#00E5CC] hover:text-slate-950 transition font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                      >
                        Explore Discovery Feed <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 text-gray-400 rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-5 py-2 border-t border-white/5 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-3 bg-slate-950/20">
                <QuickChip
                  icon={<MapPin size={12} />}
                  label="🔍 Find cameras nearby"
                  onClick={() => handleQuickAction("Find cameras nearby")}
                />
                <QuickChip
                  icon={<Calculator size={12} />}
                  label="💰 Deposit Calculator"
                  onClick={() => handleQuickAction("Calculate deposit for ₹20000 laptop")}
                />
                <QuickChip
                  icon={<FileText size={12} />}
                  label="📜 Draft Agreement"
                  onClick={() => handleQuickAction("Draft a lending agreement")}
                />
                <QuickChip
                  icon={<HelpCircle size={12} />}
                  label="❓ How disputes work"
                  onClick={() => handleQuickAction("How safety and disputes work")}
                />
              </div>
            )}

            {/* Message Input bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask LooPy..."
                className="flex-1 bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#00E5CC] rounded-2xl px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#00E5CC] text-slate-950 hover:bg-[#00d8b8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const QuickChip = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#00E5CC]/10 border border-white/10 hover:border-[#00E5CC]/30 text-gray-300 hover:text-white transition-all text-xs cursor-pointer"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default AIAssistant;
