import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: "primary" | "harvest" | "earth";
  index?: number;
}

export function FeatureCard({ icon: Icon, title, description, accent = "primary", index = 0 }: Props) {
  const accentBg =
    accent === "harvest" ? "bg-harvest/15 text-harvest"
    : accent === "earth" ? "bg-earth/15 text-earth"
    : "bg-primary/10 text-primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-glow transition-all"
    >
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${accentBg} group-hover:scale-110 transition-transform`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
