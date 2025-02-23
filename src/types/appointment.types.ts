export type AppointmentStatus = "scheduled" | "completed" | "canceled";

export interface Appointment {
  appointment_id: string;
  patient_id: string;
  doctor_id: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}
