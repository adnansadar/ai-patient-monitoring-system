"use client";

import { FaUserMd, FaMobile, FaBrain } from "react-icons/fa";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="text-center pt-16 sm:pt-20 lg:pt-24">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Welcome to</span>
                  <span className="block text-primary-600">wellSync</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  An AI-powered patient monitoring system that connects patients
                  with healthcare providers for better health outcomes.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 transform transition-all hover:scale-105"
                    >
                      Get Started
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={scrollToFeatures}
                      className="w-full flex items-center justify-center px-8 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 md:py-4 md:text-lg md:px-10 transform transition-all hover:scale-105"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-section" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose wellSync?
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={FaBrain}
              title="AI-Powered Monitoring"
              description="Advanced algorithms monitor your health metrics in real-time and provide personalized insights."
            />
            <FeatureCard
              icon={FaMobile}
              title="Device Integration"
              description="Seamlessly connect with your favorite health monitoring devices and wearables."
            />
            <FeatureCard
              icon={FaUserMd}
              title="Expert Care"
              description="Direct connection with healthcare providers for immediate attention when needed."
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-50">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard number="98%" text="Patient Satisfaction" />
            <StatCard number="24/7" text="Health Monitoring" />
            <StatCard number="15min" text="Average Response Time" />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <StepCard
              number={1}
              title="Connect Your Device"
              description="Link your health monitoring devices to wellSync."
            />
            <StepCard
              number={2}
              title="Real-time Monitoring"
              description="Get continuous health tracking and instant alerts."
            />
            <StepCard
              number={3}
              title="Expert Care"
              description="Receive immediate attention from healthcare providers when needed."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to Take Control of Your Health?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-100">
            Join thousands of users who trust wellSync for their health
            monitoring needs.
          </p>
          <div className="mt-8">
            <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transform transition-all hover:scale-105 sm:w-auto">
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
      <div>
        <div className="absolute h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
        <div className="pl-16">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-base text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ number, text }: { number: string; text: string }) {
  return (
    <div className="bg-white px-6 py-8 rounded-xl shadow-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
      <div className="text-4xl font-extrabold text-primary-600">{number}</div>
      <div className="mt-2 text-lg font-medium text-gray-500">{text}</div>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
      <div className="absolute h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center">
        <span className="text-xl font-bold text-primary-600">{number}</span>
      </div>
      <div className="pl-16">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
}
