"use client";

import { useAppContext } from "@/context/AppContext";
import { useState, useEffect } from "react";
import { Patient } from "@/types/patient.types";
import { MedicalReport } from "@/types/report.types";
import { Recommendation } from "@/types/recommendation.types";
import {
  FaUserMd,
  FaSearch,
  FaExclamationTriangle,
  FaFileMedical,
  FaPrescription,
} from "react-icons/fa";
import { Skeleton } from "@/components/Skeleton";

export default function DoctorDashboard() {
  const { doctors } = useAppContext();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Current doctor (D001)
  const currentDoctor = doctors.find((d) => d.id === "D001");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, reportsRes, recommendationsRes] = await Promise.all(
          [
            fetch("/data/patients.json"),
            fetch("/data/reports.json"),
            fetch("/data/recommendations.json"),
          ]
        );

        const patientsData: Patient[] = await patientsRes.json();
        const reportsData: MedicalReport[] = await reportsRes.json();
        const recommendationsData: Recommendation[] =
          await recommendationsRes.json();

        // Filter patients assigned to current doctor
        setPatients(
          patientsData.filter((p) => currentDoctor?.patients.includes(p.id))
        );
        setReports(reportsData.filter((r) => r.doctor_id === "D001"));
        setRecommendations(
          recommendationsData.filter((r) =>
            currentDoctor?.patients.includes(r.patientId)
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentDoctor]);

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Doctor Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center">
          <div className="bg-primary-50 p-3 rounded-lg">
            <FaUserMd className="h-8 w-8 text-primary-600" />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Dr. {currentDoctor?.name}
            </h1>
            <p className="text-gray-500">{currentDoctor?.specialization}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patient Overview */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Patient Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-gray-500">ID: {patient.id}</p>
                </div>
                {patient.chronic_conditions.length > 0 && (
                  <div className="bg-warning-50 p-2 rounded-full">
                    <FaExclamationTriangle className="h-5 w-5 text-warning-500" />
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Last Checkup:{" "}
                  {new Date(patient.last_checkup).toLocaleDateString()}
                </p>
                {patient.chronic_conditions.length > 0 && (
                  <p className="text-sm text-gray-600">
                    Conditions: {patient.chronic_conditions.join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reports Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reports</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {reports.slice(0, 5).map((report) => {
              const patient = patients.find((p) => p.id === report.patient_id);
              return (
                <div
                  key={report.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="bg-primary-50 p-2 rounded-lg">
                      <FaFileMedical className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {patient?.name} -{" "}
                          {report.type.replace("_", " ").toUpperCase()}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === "critical"
                              ? "bg-danger-100 text-danger-800"
                              : report.status === "abnormal"
                              ? "bg-warning-100 text-warning-800"
                              : "bg-success-100 text-success-800"
                          }`}
                        >
                          {report.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Date: {new Date(report.date).toLocaleString()}
                      </p>
                      <ReportDetails report={report} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          AI Recommendations
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {recommendations.slice(0, 5).map((rec) => {
              const patient = patients.find((p) => p.id === rec.patientId);
              return (
                <div
                  key={rec.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="bg-primary-50 p-2 rounded-lg">
                      <FaPrescription className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {patient?.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              rec.priority === "high"
                                ? "bg-danger-100 text-danger-800"
                                : rec.priority === "medium"
                                ? "bg-warning-100 text-warning-800"
                                : "bg-success-100 text-success-800"
                            }`}
                          >
                            {rec.priority.toUpperCase()}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {rec.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {rec.message}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(rec.timestamp).toLocaleString()}
                        </span>
                        <div className="flex items-center text-sm text-primary-600">
                          <span className="font-medium">
                            Suggested Action:{" "}
                          </span>
                          <span className="ml-1">{rec.suggestedAction}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-12 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function ReportDetails({ report }: { report: MedicalReport }) {
  return (
    <div className="mt-4 bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Test Results:</h4>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(report.results).map(([key, value]) => (
          <div key={key} className="text-sm">
            <span className="text-gray-600">
              {key.replace(/_/g, " ").toUpperCase()}:{" "}
            </span>
            <span className="text-gray-900 font-medium">{value}</span>
          </div>
        ))}
      </div>
      {report.notes && (
        <div className="mt-3 text-sm">
          <span className="text-gray-600">Notes: </span>
          <span className="text-gray-900">{report.notes}</span>
        </div>
      )}
    </div>
  );
}
