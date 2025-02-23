export type AlertType = "critical" | "warning" | "info";

export interface GeneratedAlert {
  id: string;
  alert_id: string;
  patient_id: string;
  alert_type: AlertType;
  message: string;
  timestamp: string;
  doctor_notified: boolean;
}
