import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sprout, FlaskConical, Beaker, CloudSun, Bug, TrendingUp, MessageCircle,
  ArrowRight, Sparkles, Leaf,
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Krishi AI — Smart Crop Recommendation & Farming Assistant" },
      { name: "description", content: "Get AI-powered crop recommendations, soil analysis, weather alerts and profitability insights for your farm." },
    ],
  }),
});

const features = [
  { icon: Sprout, title: "Crop Recommendation", description: "Best crop choices based on your soil nutrients, climate and location.", accent: "primary" as const },
  { icon: FlaskConical, title: "Soil Health Analysis", description: "Understand your soil's nutrient balance and improve fertility.", accent: "earth" as const },
  { icon: Beaker, title: "Fertilizer Advice", description: "Personalized NPK and organic fertilizer suggestions.", accent: "harvest" as const },
  { icon: CloudSun, title: "Weather Alert", description: "Stay ahead of rain, heatwaves and unexpected weather events.", accent: "primary" as const },
  { icon: Bug, title: "Disease Risk Prediction", description: "Early warnings for pests and crop diseases before they spread.", accent: "earth" as const },
  { icon: TrendingUp, title: "Profitability Insights", description: "Estimate yield value and choose the most profitable crop.", accent: "harvest" as const },
  { icon: MessageCircle, title: "AI Chatbot", description: "Ask anything in English or Hindi — your 24/7 farming assistant.", accent: "primary" as const },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-sky" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-harvest/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered Smart Agriculture
            </span>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Krishi <span className="bg-gradient-hero bg-clip-text text-transparent">AI</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-xl">
              Smart Crop Recommendation and Farming Assistant — grow better with data, weather, and intelligent insights tuned for your land.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/recommend" className="group inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all">
                Get Recommendation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">
                Explore Features
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-primary" /> 50+ crops</div>
              <div className="flex items-center gap-2"><CloudSun className="h-4 w-4 text-harvest" /> Live weather</div>
              <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-earth" /> Hindi + English</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-3xl bg-gradient-card border border-border p-6 shadow-glow">
              <div className="rounded-2xl bg-card p-6 border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today's Insight</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Live</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold">Wheat looks best for your soil 🌾</h3>
                <p className="mt-1 text-sm text-muted-foreground">High N levels, stable rainfall and ideal pH detected.</p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { l: "Confidence", v: "92%" },
                    { l: "Profit", v: "₹48k" },
                    { l: "Water", v: "Medium" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-xl bg-muted p-3 text-center">
                      <div className="text-lg font-bold text-primary">{s.v}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
                  <CloudSun className="h-8 w-8 text-harvest" />
                  <div>
                    <div className="text-sm font-semibold">28°C Sunny</div>
                    <div className="text-xs text-muted-foreground">No alerts</div>
                  </div>
                </div>
                <div className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
                  <FlaskConical className="h-8 w-8 text-earth" />
                  <div>
                    <div className="text-sm font-semibold">Soil: Loamy</div>
                    <div className="text-xs text-muted-foreground">pH 6.8</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Everything your farm needs, in one place</h2>
          <p className="mt-3 text-muted-foreground">From sowing to harvest — Krishi AI guides every step with data-driven recommendations.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-hero p-10 sm:p-14 text-center shadow-glow">
          <h3 className="text-3xl sm:text-4xl font-bold text-primary-foreground">Ready to grow smarter?</h3>
          <p className="mt-3 text-primary-foreground/90 max-w-xl mx-auto">Enter your soil and weather data and get a personalized crop recommendation in seconds.</p>
          <Link to="/recommend" className="mt-7 inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary hover:-translate-y-0.5 transition-transform shadow-soft">
            Get Recommendation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
