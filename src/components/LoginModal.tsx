"use client";

import { useAppContext } from "@/context/AppContext";
import { UserRole } from "@/context/AppContext";
import { FaUserMd, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { setUserRole } = useAppContext();
  const router = useRouter();

  const roles = [
    {
      id: "patient",
      title: "Patient",
      icon: FaUser,
      description:
        "Access your health dashboard and connect with healthcare providers",
    },
    {
      id: "doctor",
      title: "Doctor",
      icon: FaUserMd,
      description: "Monitor patients and provide expert medical care",
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    onClose();
    router.push(role === "patient" ? "/patient" : "/doctor");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 transform transition-all animate-fade-in">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome to wellSync
            </h2>
            <p className="mt-2 text-gray-600">
              Please select your role to continue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id as UserRole)}
                className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-primary-500 transition-all duration-200 transform hover:scale-105 hover:shadow-md text-left group"
              >
                <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-100">
                  <role.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
