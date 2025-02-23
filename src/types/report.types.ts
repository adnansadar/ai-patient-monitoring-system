export interface Report {
  patient_id: string;
  report_id: string;
  date: string;
  type: string;
  results: TestResults;
  doctor_notes: string;
}

export interface TestResults {
  glucose_level: number;
  cholesterol: number;
  triglycerides: number;
}

export interface MedicalReport {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: string;
  type: "blood_test" | "glucose" | "cholesterol";
  results: {
    [key: string]: number | string;
  };
  status: "normal" | "abnormal" | "critical";
  notes: string;
}
