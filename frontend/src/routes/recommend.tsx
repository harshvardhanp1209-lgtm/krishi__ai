import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Sprout,
  FlaskConical,
  Beaker,
  CloudSun,
  Bug,
  TrendingUp,
  Calendar,
  Droplets,
  Loader2,
  MapPin,
  Languages,
  Sparkles,
} from "lucide-react";
import { predictCrop, type CropPredictionInput, type CropPredictionResponse } from "@/lib/api";
import { ResultCard } from "@/components/ResultCard";

export const Route = createFileRoute("/recommend")({
  component: Recommend,
});

type FormState = {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
  location: string;
  language: "English" | "Hindi";
};

const initial: FormState = {
  nitrogen: "",
  phosphorus: "",
  potassium: "",
  temperature: "",
  humidity: "",
  ph: "",
  rainfall: "",
  location: "",
  language: "English",
};

const fields: {
  key: keyof Omit<FormState, "location" | "language">;
  label: string;
  placeholder: string;
  min: number;
  max: number;
  step?: string;
}[] = [
  { key: "nitrogen", label: "Nitrogen (N)", placeholder: "e.g. 90", min: 0, max: 140 },
  { key: "phosphorus", label: "Phosphorus (P)", placeholder: "e.g. 42", min: 0, max: 145 },
  { key: "potassium", label: "Potassium (K)", placeholder: "e.g. 43", min: 0, max: 205 },
  {
    key: "temperature",
    label: "Temperature (°C)",
    placeholder: "e.g. 25",
    min: -10,
    max: 50,
    step: "0.1",
  },
  { key: "humidity", label: "Humidity (%)", placeholder: "e.g. 70", min: 0, max: 100, step: "0.1" },
  { key: "ph", label: "Soil pH", placeholder: "e.g. 6.8", min: 0, max: 14, step: "0.1" },
  {
    key: "rainfall",
    label: "Rainfall (mm)",
    placeholder: "e.g. 200",
    min: 0,
    max: 3000,
    step: "0.1",
  },
];

function Recommend() {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CropPredictionResponse | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};

    fields.forEach((f) => {
      const value = form[f.key];
      const numberValue = Number(value);

      if (value === "" || Number.isNaN(numberValue)) {
        e[f.key] = "Required";
      } else if (numberValue < f.min || numberValue > f.max) {
        e[f.key] = `Range ${f.min}–${f.max}`;
      }
    });

    if (!form.location.trim()) e.location = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const input: CropPredictionInput = {
        N: Number(form.nitrogen),
        P: Number(form.phosphorus),
        K: Number(form.potassium),
        temperature: Number(form.temperature),
        humidity: Number(form.humidity),
        ph: Number(form.ph),
        rainfall: Number(form.rainfall),
        location: form.location.trim(),
        language: form.language === "Hindi" ? "hi" : "en",
      };

      const data = await predictCrop(input);
      setResult(data);
      toast.success("Recommendation ready 🌾");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Prediction failed";
      toast.error(`Could not reach API: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (k: keyof FormState) =>
    `w-full rounded-xl border ${errors[k] ? "border-destructive" : "border-border"} bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" /> AI Recommendation
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Crop Recommendation</h1>
        <p className="mt-3 text-muted-foreground">
          Enter your soil and weather details — Krishi AI will recommend the best crop with
          insights.
        </p>
      </motion.div>

      <div className="mt-10 grid lg:grid-cols-5 gap-8">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-soft h-fit"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key} className={f.key === "rainfall" ? "sm:col-span-2" : ""}>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {f.label}
                </label>
                <input
                  type="number"
                  step={f.step ?? "1"}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className={`mt-1.5 ${inputCls(f.key)}`}
                />
                {errors[f.key] && <p className="mt-1 text-xs text-destructive">{errors[f.key]}</p>}
              </div>
            ))}

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Location
              </label>
              <input
                type="text"
                placeholder="e.g. Pune, Maharashtra"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={`mt-1.5 ${inputCls("location")}`}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-destructive">{errors.location}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Languages className="h-3.5 w-3.5" /> Language
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(["English", "Hindi"] as const).map((lang) => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => setForm({ ...form, language: lang })}
                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                      form.language === lang
                        ? "border-primary bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Analyzing…
              </>
            ) : (
              <>Get Recommendation</>
            )}
          </button>
        </motion.form>

        <div className="lg:col-span-3">
          {!result && !loading && (
            <div className="rounded-3xl border border-dashed border-border bg-gradient-card p-10 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Sprout className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Your recommendation will appear here</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                Fill the form and submit to see AI-powered insights for your farm.
              </p>
            </div>
          )}

          {loading && (
            <div className="rounded-3xl border border-border bg-card p-10 flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">
                Analyzing soil, weather, and crop data…
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-glow"
              >
                <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                  Recommended Crop
                </span>
                <div className="mt-2 flex items-end gap-4 flex-wrap">
                  <h2 className="text-5xl font-bold">{result.recommended_crop || "—"}</h2>
                  <span className="rounded-full bg-card/20 backdrop-blur px-4 py-1.5 text-sm font-semibold">
                    Confidence: {Math.round((result.confidence_score || 0) * 100)}%
                  </span>
                </div>
                <p className="mt-3 text-primary-foreground/90 max-w-2xl">{result.reason || "—"}</p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-5">
                <ResultCard icon={FlaskConical} title="Soil Health" index={0}>
                  {result.soil_health || "—"}
                </ResultCard>
                <ResultCard icon={Beaker} title="Fertilizer Advice" index={1}>
                  {result.fertilizer_recommendation || "—"}
                </ResultCard>
                <ResultCard icon={CloudSun} title="Weather Alert" index={2}>
                  {result.weather_alert || "—"}
                </ResultCard>
                <ResultCard icon={Bug} title="Disease Risk" index={3}>
                  {result.disease_risk || "—"}
                </ResultCard>
                <ResultCard icon={TrendingUp} title="Profitability" index={4}>
                  {result.profitability || "—"}
                </ResultCard>
                <ResultCard icon={Droplets} title="Water Requirement" index={5}>
                  {result.crop_calendar?.water_requirement || "—"}
                </ResultCard>

                <div className="sm:col-span-2">
                  <ResultCard icon={Calendar} title="Crop Calendar" index={6}>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="rounded-xl bg-muted p-3">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">
                          Sowing
                        </div>
                        <div className="mt-1 font-semibold">
                          {result.crop_calendar?.sowing_time || "—"}
                        </div>
                      </div>
                      <div className="rounded-xl bg-muted p-3">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">
                          Harvest
                        </div>
                        <div className="mt-1 font-semibold">
                          {result.crop_calendar?.harvesting_time || "—"}
                        </div>
                      </div>
                    </div>
                  </ResultCard>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
