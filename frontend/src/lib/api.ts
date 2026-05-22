import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export interface CropPredictionInput {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  location: string;
  language: string;
}

export interface CropPredictionResponse {
  recommended_crop: string;
  confidence_score: number;
  reason: string;
  soil_health: string;
  fertilizer_recommendation: string;
  weather_alert: string;
  disease_risk: string;
  profitability: string;
  crop_calendar: {
    sowing_time: string;
    harvesting_time: string;
    water_requirement: string;
  };
}

export interface ChatResponse {
  reply: string;
}

export async function predictCrop(input: CropPredictionInput): Promise<CropPredictionResponse> {
  const { data } = await axios.post<CropPredictionResponse>(`${API_BASE}/predict-crop`, input, {
    timeout: 20000,
  });

  return data;
}

export async function sendChatMessage(
  message: string,
  language: string = "en",
): Promise<ChatResponse> {
  const { data } = await axios.post<ChatResponse>(
    `${API_BASE}/chat`,
    {
      message,
      language,
    },
    { timeout: 20000 },
  );

  return data;
}
