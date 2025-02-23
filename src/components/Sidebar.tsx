"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaUserMd,
  FaUser,
  FaChartLine,
  FaBell,
  FaCalendarAlt,
  FaCog,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaPills,
  FaFileAlt,
} from "react-icons/fa";

function ActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const actionItems = [
    { name: "Add Medication", href: "/patient/add-medication", icon: FaPills },
    { name: "View Reports", href: "/patient/reports", icon: FaFileAlt },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
      >
        <FaChevronDown
          className={`w-4 h-4 mr-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span>Actions</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="bg-gray-700 py-2">
          {actionItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-10 py-2 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors ${
                  pathname === item.href ? "bg-gray-600 text-white" : ""
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { userRole } = useAppContext();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar by default on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Don't render the sidebar on the landing page
  if (pathname === "/") {
    return null;
  }

  const navigationItems = {
    patient: [
      { name: "Dashboard", href: "/patient", icon: FaChartLine },
      {
        name: "Appointments",
        href: "/patient/appointments",
        icon: FaCalendarAlt,
      },
      { name: "Alerts", href: "/patient/alerts", icon: FaBell },
      { name: "Profile", href: "/patient/profile", icon: FaUser },
    ],
    doctor: [
      { name: "Dashboard", href: "/doctor", icon: FaChartLine },
      { name: "Patients", href: "/doctor/patients", icon: FaUser },
      {
        name: "Appointments",
        href: "/doctor/appointments",
        icon: FaCalendarAlt,
      },
      { name: "Profile", href: "/doctor/profile", icon: FaUserMd },
    ],
    admin: [
      { name: "Dashboard", href: "/admin", icon: FaChartLine },
      { name: "Users", href: "/admin/users", icon: FaUser },
      { name: "Settings", href: "/admin/settings", icon: FaCog },
    ],
  };

  const currentNavItems = navigationItems[userRole];

  return (
    <>
      {/* Mobile menu button - Only show if not on landing page */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:static lg:translate-x-0 z-20 h-full w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="p-6">
          <Link
            href="/"
            className="text-2xl font-bold cursor-pointer hover:text-primary-300 transition-colors"
          >
            wellSync
          </Link>
        </div>
        <nav className="mt-6">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
                  pathname === item.href ? "bg-gray-700 text-white" : ""
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          {userRole === "patient" && <ActionMenu />}
        </nav>
      </div>
    </>
  );
}
