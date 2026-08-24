import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LIFELINK - Healthcare Assistance Platform",
  description: "Connecting You to Care, When It Matters Most. Find nearby hospitals, doctors, blood donors, and compare healthcare prices in West Bengal.",
  keywords: "healthcare, hospitals, doctors, blood donors, West Bengal, medical services",
  authors: [{ name: "LIFELINK Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-medical`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
