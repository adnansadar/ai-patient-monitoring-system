"use client";

import { useAppContext } from "@/context/AppContext";
import { FaBell, FaUser, FaChevronDown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { UserRole } from "@/context/AppContext";
import LoginModal from "./LoginModal";
import { usePathname, useRouter } from "next/navigation";

export default function TopNav() {
  const { userRole, setUserRole, currentPatient, alerts } = useAppContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRoleAccordionOpen, setIsRoleAccordionOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const unreadAlerts = alerts.filter(
    (alert) => alert.alert_type === "critical"
  ).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
        setIsRoleAccordionOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    setIsProfileOpen(false);
    setIsRoleAccordionOpen(false);
    // Redirect to appropriate dashboard
    router.push(newRole === "patient" ? "/patient" : "/doctor");
  };

  // Show different content based on whether we're on the landing page
  const isLandingPage = pathname === "/";

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center pl-12 lg:pl-0">
                <span className="text-xl font-semibold text-gray-800 hidden md:block">
                  {isLandingPage
                    ? "wellSync"
                    : userRole === "patient"
                    ? `Welcome to wellSync, ${currentPatient?.name}`
                    : `wellSync ${
                        userRole.charAt(0).toUpperCase() + userRole.slice(1)
                      } Dashboard`}
                </span>
                <span className="text-xl font-semibold text-gray-800 md:hidden pl-6">
                  wellSync
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isLandingPage ? (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Login
                </button>
              ) : (
                <>
                  {/* Notifications */}
                  <button className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">View notifications</span>
                    <FaBell className="h-6 w-6" />
                    {unreadAlerts > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger-500 text-xs font-medium text-white">
                        {unreadAlerts}
                      </span>
                    )}
                  </button>

                  {/* Profile dropdown */}
                  <div className="relative flex items-center" ref={dropdownRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 p-2 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <div className="bg-primary-100 p-2 rounded-full">
                        <FaUser className="h-5 w-5 text-primary-600" />
                      </div>
                      <span className="text-sm font-medium hidden sm:block">
                        Profile
                      </span>
                      <FaChevronDown
                        className={`h-4 w-4 hidden sm:block transition-transform duration-200 ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center">
                            <div className="bg-primary-100 p-2 rounded-full">
                              <FaUser className="h-5 w-5 text-primary-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {currentPatient?.name || "User"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {userRole.charAt(0).toUpperCase() +
                                  userRole.slice(1)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Switch Role Section */}
                        <div className="px-4 py-2">
                          <button
                            onClick={() =>
                              setIsRoleAccordionOpen(!isRoleAccordionOpen)
                            }
                            className="flex items-center justify-between w-full text-left text-sm text-gray-700 hover:text-gray-900"
                          >
                            <span>Switch Role</span>
                            <FaChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isRoleAccordionOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {/* Role Options */}
                          {isRoleAccordionOpen && (
                            <div className="mt-2 space-y-1">
                              {["patient", "doctor"].map((role) => (
                                <button
                                  key={role}
                                  onClick={() =>
                                    handleRoleChange(role as UserRole)
                                  }
                                  className={`w-full px-3 py-2 text-sm rounded-md text-left ${
                                    userRole === role
                                      ? "bg-primary-50 text-primary-700"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  {role.charAt(0).toUpperCase() + role.slice(1)}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
