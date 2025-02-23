import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "wellSync - AI-Powered Patient Monitoring System",
    template: "%s | wellSync",
  },
  description:
    "An intelligent healthcare monitoring platform that connects patients, doctors, and healthcare providers for better health outcomes.",
  keywords: [
    "patient monitoring",
    "healthcare",
    "AI healthcare",
    "medical dashboard",
    "health tracking",
    "patient care",
    "digital health",
    "telemedicine",
    "health metrics",
    "wellSync",
  ],
  authors: [{ name: "wellSync Health Technologies" }],
  creator: "wellSync Health Technologies",
  publisher: "wellSync Health Technologies",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wellsync.health",
    site_name: "wellSync",
    title: "wellSync - AI-Powered Patient Monitoring System",
    description:
      "An intelligent healthcare monitoring platform that connects patients, doctors, and healthcare providers for better health outcomes.",
    images: [
      {
        url: "/images/wellsync-og.png",
        width: 1200,
        height: 630,
        alt: "wellSync Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "wellSync - AI-Powered Patient Monitoring System",
    description:
      "An intelligent healthcare monitoring platform that connects patients, doctors, and healthcare providers for better health outcomes.",
    images: ["/images/wellsync-og.png"],
    creator: "@wellSync",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="application-name" content="wellSync" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="wellSync" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        <AppContextProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppContextProvider>
      </body>
    </html>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // Check if we're on the landing page
  const isLandingPage =
    typeof window !== "undefined" ? window.location.pathname === "/" : false;

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-white">
        <TopNav />
        <main className="w-full">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
