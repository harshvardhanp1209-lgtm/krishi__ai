import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sprout, FlaskConical, Beaker, CloudSun, Bug, TrendingUp, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/StatCard";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Krishi AI" },
      { name: "description", content: "View your farm analytics: best crop, soil status, weather risk and profit estimates." },
    ],
  }),
});

const stats = [
  { icon: Sprout, label: "Best Crop", value: "Wheat", hint: "Confidence 92%", tone: "green" as const },
  { icon: FlaskConical, label: "Soil Status", value: "Healthy", hint: "pH 6.8 · Loamy", tone: "earth" as const },
  { icon: Beaker, label: "Fertilizer Need", value: "Low", hint: "NPK balanced", tone: "yellow" as const },
  { icon: CloudSun, label: "Weather Risk", value: "Mild", hint: "Light rain expected", tone: "yellow" as const },
  { icon: Bug, label: "Disease Risk", value: "Low", hint: "No outbreaks nearby", tone: "green" as const },
  { icon: TrendingUp, label: "Profit Estimate", value: "₹48,000", hint: "Per acre", tone: "earth" as const },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Farm Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Live insights from your last recommendation.</p>
        </div>
        <Link to="/recommend" className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all">
          New Recommendation <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 rounded-3xl bg-card border border-border p-6 shadow-soft">
          <h3 className="text-lg font-semibold">Seasonal Outlook</h3>
          <p className="mt-1 text-sm text-muted-foreground">Trends from the past 6 months for your region.</p>
          <div className="mt-5 grid grid-cols-6 gap-2 items-end h-40">
            {[40, 65, 55, 80, 72, 90].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-t-xl bg-gradient-to-t from-primary to-harvest"
                title={`Month ${i + 1}: ${h}`}
              />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-6 text-[10px] uppercase text-muted-foreground text-center">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => <div key={m}>{m}</div>)}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-gradient-card border border-border p-6 shadow-soft">
          <h3 className="text-lg font-semibold">Quick Tips</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "Irrigate early morning to reduce evaporation.",
              "Rotate legumes every 3rd season to fix nitrogen.",
              "Scout fields weekly for early pest signs.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span className="text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
