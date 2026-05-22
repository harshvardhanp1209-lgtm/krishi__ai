import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf, Brain, ShieldCheck, Users, ArrowRight, Sprout } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Krishi AI" },
      { name: "description", content: "Learn how Krishi AI uses artificial intelligence to help farmers grow better and more profitably." },
    ],
  }),
});

const benefits = [
  { icon: Brain, title: "Data-Driven Decisions", text: "ML models trained on soil, weather, and crop data give precise recommendations." },
  { icon: ShieldCheck, title: "Reduce Risk", text: "Early disease and weather alerts protect your yield before damage occurs." },
  { icon: Users, title: "Farmer-First Design", text: "Built in English and Hindi with simple UI — no tech expertise needed." },
  { icon: Leaf, title: "Sustainable Farming", text: "Optimized fertilizer use lowers cost and protects soil for future seasons." },
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-hero items-center justify-center shadow-glow">
          <Sprout className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold">About Krishi AI</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A smart farming assistant that turns soil, climate, and crop data into clear, actionable recommendations — built for every farmer.
        </p>
      </motion.div>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-card border border-border p-7 shadow-soft">
          <h2 className="text-2xl font-bold">What is Krishi AI?</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Krishi AI is an AI-powered platform that helps farmers choose the right crop, manage soil health, predict disease risk, and maximize profitability. By combining your soil's NPK levels, local weather, pH and rainfall, it delivers a complete farming plan in seconds.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-gradient-card border border-border p-7 shadow-soft">
          <h2 className="text-2xl font-bold">How AI Helps Farmers</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Traditional farming relies on intuition and tradition. Krishi AI augments that wisdom with machine learning models trained on thousands of agronomic data points — so every recommendation is personalized to <em>your</em> field, <em>your</em> season, and <em>your</em> goals.
          </p>
        </motion.div>
      </div>

      <h2 className="mt-16 text-3xl font-bold text-center">Benefits of the System</h2>
      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-glow transition-shadow flex gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <b.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-gradient-hero p-10 text-center shadow-glow">
        <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground">Start farming smarter today</h3>
        <Link to="/recommend" className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary hover:-translate-y-0.5 transition-transform shadow-soft">
          Get Recommendation <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
