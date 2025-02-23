"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Patient } from "@/types/patient.types";
import { GeneratedAlert } from "@/types/alert.types";
import { Recommendation } from "@/types/recommendation.types";
import { Appointment } from "@/types/appointment.types";
import { Doctor } from "@/types/doctor.types";

// Types for our data
export type UserRole = "patient" | "doctor" | "admin";

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  alerts: GeneratedAlert[];
  recommendations: Recommendation[];
  appointments: Appointment[];
  doctors: Doctor[];
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<UserRole>("patient");
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [alerts, setAlerts] = useState<GeneratedAlert[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all required data
        const [
          patientsRes,
          alertsRes,
          recommendationsRes,
          appointmentsRes,
          doctorsRes,
        ] = await Promise.all([
          fetch("/data/patients.json"),
          fetch("/data/alerts.json"),
          fetch("/data/recommendations.json"),
          fetch("/data/appointments.json"),
          fetch("/data/doctors.json"),
        ]);

        const patientsData: Patient[] = await patientsRes.json();
        const alertsData: GeneratedAlert[] = await alertsRes.json();
        const recommendationsData: Recommendation[] =
          await recommendationsRes.json();
        const appointmentsData: Appointment[] = await appointmentsRes.json();
        const doctorsData: Doctor[] = await doctorsRes.json();

        // Set mock current patient (P001)
        setCurrentPatient(patientsData.find((p) => p.id === "P001") || null);
        setAlerts(alertsData.filter((alert) => alert.patient_id === "P001"));
        setRecommendations(
          recommendationsData.filter((rec) => rec.patientId === "P001")
        );
        setAppointments(
          appointmentsData.filter((apt) => apt.patient_id === "P001")
        );
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentPatient,
        setCurrentPatient,
        alerts,
        recommendations,
        appointments,
        doctors,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
