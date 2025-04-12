import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { Sidebar, SidebarItem } from "./components/sidebar";
import { BotMessageSquare, LayoutDashboard } from "lucide-react";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenSales",
  description: "Inter Opera Coding Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white antialiased`}
      >
        <div className="flex min-h-screen">
          <Sidebar>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              link="/"
              text="Dashboard"
            />
            <SidebarItem
              icon={<BotMessageSquare size={20} />}
              link="/ask-bot"
              text="AskBot"
            />
          </Sidebar>
          <div className="flex-grow bg-gray-50">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
