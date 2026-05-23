import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  tone?: "green" | "yellow" | "earth" | "red";
  index?: number;
}

export function StatCard({ icon: Icon, label, value, hint, tone = "green", index = 0 }: Props) {
  const toneCls =
    tone === "yellow"
      ? "from-accent/30 to-harvest/20 text-harvest"
      : tone === "earth"
        ? "from-earth/20 to-secondary/30 text-earth"
        : tone === "red"
          ? "from-destructive/15 to-accent/10 text-destructive"
          : "from-primary/15 to-accent/15 text-primary";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`rounded-2xl border border-border p-6 bg-gradient-to-br ${toneCls} bg-card shadow-soft hover:shadow-glow transition-all`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-3 text-2xl font-bold text-foreground">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </motion.div>
  );
}
