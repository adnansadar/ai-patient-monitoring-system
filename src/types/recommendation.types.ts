export interface Recommendation {
  id: string;
  patientId: string;
  type: string;
  message: string;
  timestamp: string;
  priority: "low" | "medium" | "high";
  category: string;
  suggestedAction: string;
}
