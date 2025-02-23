export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  weight: number;
  height: number;
  blood_type: string;
  allergies: string[];
  chronic_conditions: string[];
  medications: string[];
  last_checkup: string;
  assigned_doctor: string;
  fitbit_data: FitbitData;
  alerts: Alert[];
}

export interface FitbitData {
  heart_rate: number;
  blood_sugar: number;
  blood_pressure: string;
  steps_today: number;
  sleep_hours: number;
}

export interface Alert {
  type: string;
  value: number | string;
  status: "normal" | "warning" | "high" | "critical";
  message: string;
}
