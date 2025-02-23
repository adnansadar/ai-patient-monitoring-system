"use client";

import { useAppContext } from "@/context/AppContext";
import { GeneratedAlert } from "@/types/alert.types";
import { Recommendation } from "@/types/recommendation.types";
import { Skeleton } from "@/components/Skeleton";
import {
  FaHeartbeat,
  FaTint,
  FaStethoscope,
  FaCalendarCheck,
  FaBell,
  FaLightbulb,
  FaMobileAlt,
  FaWalking,
  FaMapMarkerAlt,
  FaClock,
  FaExternalLinkAlt,
  FaChevronDown,
  FaMoon,
  FaWeight,
  FaRuler,
  FaCalendar,
} from "react-icons/fa";
import { useEffect, useState } from "react";

// Card component for metrics
function MetricCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className: string }>;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transform transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02]">
      <div className="flex items-center">
        <div className={`p-3 rounded-xl ${bgColor} ${color} mr-4`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for metric card
function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <Skeleton className="w-12 h-12 rounded-full mr-4" />
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for alerts and recommendations
function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <Skeleton className="w-2 h-2 rounded-full mr-3" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}

function formatDateTime(timestamp: string) {
  return new Date(timestamp).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PatientDashboard() {
  const {
    currentPatient,
    alerts,
    recommendations,
    appointments,
    loading: contextLoading,
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [deviceConnected] = useState(true); // Simulated device status
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  const additionalMetrics = currentPatient
    ? [
        {
          title: "Sleep Hours",
          value: `${currentPatient.fitbit_data.sleep_hours} hrs`,
          icon: FaMoon,
          color: "text-indigo-600",
          bgColor: "bg-indigo-50",
        },
        {
          title: "Weight",
          value: `${currentPatient.weight} kg`,
          icon: FaWeight,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
        },
        {
          title: "BMI",
          value: (
            currentPatient.weight / Math.pow(currentPatient.height / 100, 2)
          ).toFixed(1),
          icon: FaRuler,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
        },
        {
          title: "Last Checkup",
          value: new Date(currentPatient.last_checkup).toLocaleDateString(),
          icon: FaCalendar,
          color: "text-rose-600",
          bgColor: "bg-rose-50",
        },
      ]
    : [];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton loader while either context is loading or artificial delay is active
  if (contextLoading || isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Health Metrics Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <MetricCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Alerts Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="bg-white rounded-lg shadow overflow-hidden divide-y divide-gray-200">
            {[...Array(3)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Recommendations Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="bg-white rounded-lg shadow overflow-hidden divide-y divide-gray-200">
            {[...Array(2)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentPatient) {
    return <div>No patient data available</div>;
  }

  const nextAppointment = appointments[0];
  const hospitalInfo = {
    name: "Buffalo General Medical Center",
    address: "100 High Street, Buffalo, NY 14203",
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Device Status */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              deviceConnected ? "bg-success-50" : "bg-danger-50"
            } mr-3`}
          >
            <FaMobileAlt
              className={`h-5 w-5 ${
                deviceConnected ? "text-success-600" : "text-danger-600"
              }`}
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {deviceConnected ? "Device Connected" : "Device Disconnected"}
            </p>
            <p className="text-sm text-gray-500">Fitbit Sense 2</p>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Health Metrics
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Blood Sugar"
              value={`${currentPatient.fitbit_data.blood_sugar} mg/dL`}
              icon={FaTint}
              color="text-primary-600"
              bgColor="bg-primary-50"
            />
            <MetricCard
              title="Blood Pressure"
              value={currentPatient.fitbit_data.blood_pressure}
              icon={FaHeartbeat}
              color="text-danger-600"
              bgColor="bg-danger-50"
            />
            <MetricCard
              title="Heart Rate"
              value={`${currentPatient.fitbit_data.heart_rate} bpm`}
              icon={FaStethoscope}
              color="text-success-600"
              bgColor="bg-success-50"
            />
            <MetricCard
              title="Daily Steps"
              value={`${currentPatient.fitbit_data.steps_today.toLocaleString()}`}
              icon={FaWalking}
              color="text-primary-600"
              bgColor="bg-primary-50"
            />
          </div>

          <button
            onClick={() => setShowAllMetrics(!showAllMetrics)}
            className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <span className="text-sm font-medium">
              {showAllMetrics ? "Show Less" : "Show More"}
            </span>
            <FaChevronDown
              className={`h-4 w-4 transform transition-transform duration-200 ${
                showAllMetrics ? "rotate-180" : ""
              }`}
            />
          </button>

          {showAllMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {additionalMetrics.map((metric) => (
                <MetricCard
                  key={metric.title}
                  title={metric.title}
                  value={metric.value}
                  icon={metric.icon}
                  color={metric.color}
                  bgColor={metric.bgColor}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Next Appointment */}
      {nextAppointment && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Next Appointment
          </h3>
          <div className="flex items-start space-x-4">
            <div className="bg-primary-50 p-3 rounded-lg">
              <FaCalendarCheck className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{hospitalInfo.name}</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-gray-600">
                  <FaClock className="h-4 w-4 flex-shrink-0" />
                  <span className="ml-2">
                    {formatDateTime(nextAppointment.date)}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="h-4 w-4 flex-shrink-0" />
                  <span className="ml-2">{hospitalInfo.address}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      hospitalInfo.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-primary-600 hover:text-primary-700"
                  >
                    <FaExternalLinkAlt className="h-3 w-3" />
                    <span className="sr-only">Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Alerts</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {alerts.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {alerts.map((alert: GeneratedAlert) => (
                <div
                  key={alert.alert_id}
                  className="p-4 transform transition-all duration-300 ease-in-out hover:bg-gray-50"
                >
                  <div className="flex items-start">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg mr-4 ${
                        alert.alert_type === "critical"
                          ? "bg-danger-50"
                          : alert.alert_type === "warning"
                          ? "bg-warning-50"
                          : "bg-success-50"
                      }`}
                    >
                      <FaBell
                        className={`h-4 w-4 ${
                          alert.alert_type === "critical"
                            ? "text-danger-600 animate-pulse-slow"
                            : alert.alert_type === "warning"
                            ? "text-warning-600"
                            : "text-success-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {alert.message}
                        {(alert.alert_type === "critical" ||
                          alert.alert_type === "warning") && (
                          <span className="block mt-1 text-sm text-gray-600">
                            A notification has been sent to your diabetes and
                            CVD specialists containing your current vitals and
                            past records.
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDateTime(alert.timestamp)}
                      </p>
                      {alert.alert_type !== "info" && (
                        <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center mb-2">
                            <FaLightbulb className="h-4 w-4 text-warning-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">
                              AI Recommendation
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {alert.alert_type === "critical"
                              ? "Please take immediate action and contact your healthcare provider. Consider checking your blood sugar levels and following your prescribed medication schedule."
                              : "Monitor your vitals closely over the next few hours and ensure you're following your prescribed treatment plan."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4 text-gray-500">No alerts at this time</p>
          )}
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          AI Recommendations
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {recommendations.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recommendations.map((rec: Recommendation) => (
                <div
                  key={rec.id}
                  className="p-4 transform transition-all duration-300 ease-in-out hover:bg-gray-50"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-primary-50 rounded-lg">
                      <FaLightbulb className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {rec.message}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {rec.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4 text-gray-500">No recommendations at this time</p>
          )}
        </div>
      </div>
    </div>
  );
}
