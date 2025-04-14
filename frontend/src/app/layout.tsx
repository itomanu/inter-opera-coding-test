import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { Sidebar, SidebarItem } from "@/components/Sidebar";
import { BotMessageSquare, LayoutDashboard } from "lucide-react";
import { SidebarProvider } from "@/context/SidebarContext";

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
        <SidebarProvider>
          <div className="flex h-screen">
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
            <div className="flex-grow bg-gray-50 overflow-y-auto">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
