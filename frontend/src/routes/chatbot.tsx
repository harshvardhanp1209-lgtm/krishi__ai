import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

export const Route = createFileRoute("/chatbot")({
  component: Chatbot,
  head: () => ({
    meta: [
      { title: "AI Chatbot — Krishi AI" },
      { name: "description", content: "Chat with the Krishi AI farming assistant in English or Hindi." },
    ],
  }),
});

type Msg = { id: number; role: "user" | "bot"; text: string };

const starter: Msg[] = [
  { id: 1, role: "bot", text: "Namaste 🙏 I'm Krishi AI. Ask me anything about crops, soil, fertilizer or weather!" },
];

const suggestions = [
  "Best crop for sandy soil?",
  "When to sow wheat?",
  "How to control aphids naturally?",
  "Fertilizer for rice in monsoon",
];

function fakeReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("wheat")) return "Wheat is best sown between October and December. Ensure soil pH is 6.0–7.5 and apply NPK 120:60:40 kg/ha.";
  if (lower.includes("rice")) return "For rice in monsoon, use urea in split doses (3 applications) and maintain 5 cm standing water during tillering.";
  if (lower.includes("aphid") || lower.includes("pest")) return "Try neem oil spray (5 ml/L) every 7 days. Encourage ladybugs — they're natural aphid predators.";
  if (lower.includes("soil")) return "Healthy soil is loamy with pH 6.0–7.5, good organic matter, and balanced NPK. Test every season for best results.";
  return "Great question! For a precise answer, share your soil type, location, and the crop you're planning. You can also use the Recommendation page for detailed AI insights.";
}

function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>(starter);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const userMsg: Msg = { id: Date.now(), role: "user", text: q };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, role: "bot", text: fakeReply(q) }]);
      setTyping(false);
    }, 900 + Math.random() * 700);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" /> 24/7 Farming Assistant
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold">AI Chatbot</h1>
        <p className="mt-3 text-muted-foreground">Ask questions in English or Hindi. Get instant farming advice.</p>
      </div>

      <div className="mt-8 rounded-3xl bg-card border border-border shadow-soft overflow-hidden flex flex-col h-[600px]">
        <div className="px-5 py-4 border-b border-border bg-gradient-sky flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-hero flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-semibold">Krishi AI Assistant</div>
            <div className="text-xs text-primary flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Online
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === "user" ? "bg-harvest/20 text-earth" : "bg-primary/10 text-primary"
                }`}>
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-hero text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm"
                }`}>
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary/60"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="border-t border-border p-3 flex gap-2 bg-card"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crops, soil, weather…"
            className="flex-1 rounded-full bg-muted px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="h-11 w-11 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
