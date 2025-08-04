import Notification from "@/components/Notification";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LA MUNCHERIA",
  description: "Best food in town!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <QueryProvider>
            <Notification />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}