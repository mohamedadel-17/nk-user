"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Database,
  Briefcase,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
  const pathname = usePathname();

  // State to manage the Collapsible Analytics menu
  const [isAnalyticsOpen, setIsAnalyticsOpen] = React.useState(true);

  // Navigation Items Configuration
  const navItems = [{ name: "Leak Intelligence", icon: Users, href: "/admin" }];

  return (
    <aside className="w-72 h-screen flex flex-col bg-[#0A0E1A] border-r border-cyan-900/30 p-4">
      {/* 1. Logo Section */}
      <div className="mb-10 px-2 py-4 border-b border-cyan-900/30">
        <Image
          src="/logo.png"
          alt="N Leaks Logo"
          width={250}
          height={60}
          className="object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
        />
      </div>

      {/* 2. Navigation Items Area */}
      <nav className="flex-1 space-y-2 px-2 overflow-y-auto custom-scrollbar">
        {/* Main Links (Overview & Leaks) */}
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-4 h-12 rounded-xl text-slate-400 font-medium transition-all duration-300",
                  isActive
                    ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    : "hover:bg-slate-800/50 hover:text-white",
                )}
              >
                <item.icon
                  className={cn(
                    "size-5",
                    isActive ? "text-slate-950" : "text-slate-400",
                  )}
                />
                {item.name}
              </Button>
            </Link>
          );
        })}

        {/* --- Data Analytics (Collapsible Section) --- */}
        <div className="space-y-1">
          <Button
            variant="ghost"
            onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
            className={cn(
              "w-full justify-between gap-4 h-12 rounded-xl transition-all font-medium",
              isAnalyticsOpen
                ? "text-white bg-slate-800/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50",
            )}
          >
            <div className="flex items-center gap-4">
              <Database className="size-5" />
              <span>Data Analytics</span>
            </div>
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-300",
                isAnalyticsOpen && "rotate-180",
              )}
            />
          </Button>

          {/* Sub-menu containing Insights and Performance */}
          {isAnalyticsOpen && (
            <div className="ml-6 mt-2 space-y-2 border-l border-slate-800 pl-4 relative">
              {/* Sub-item: Data Insights */}
              <Link href="/admin/analytics" className="block relative group">
                {/* Glowing Indicator Line */}
                <div
                  className={cn(
                    "absolute -left-[17.5px] top-1/2 -translate-y-1/2 w-[3px] h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-opacity duration-300",
                    pathname === "/admin/analytics"
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-40",
                  )}
                />
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-11 rounded-xl px-4 transition-all font-semibold",
                    pathname === "/admin/analytics"
                      ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40",
                  )}
                >
                  Data Insights
                </Button>
              </Link>

              {/* Sub-item: System Performance */}
              <Link
                href="/admin/analytics/performance"
                className="block relative group"
              >
                {/* Glowing Indicator Line */}
                <div
                  className={cn(
                    "absolute -left-[17.5px] top-1/2 -translate-y-1/2 w-[3px] h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-opacity duration-300",
                    pathname === "/admin/analytics/performance"
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-40",
                  )}
                />
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-11 rounded-xl px-4 transition-all font-semibold",
                    pathname === "/admin/analytics/performance"
                      ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40",
                  )}
                >
                  System Performance
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Company Management */}
        <Link href="/admin/company">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-4 h-12 rounded-xl text-slate-400 font-medium transition-all duration-300",
              pathname === "/admin/company"
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                : "hover:bg-slate-800/50 hover:text-white",
            )}
          >
            <Briefcase className="size-5" /> Company Management
          </Button>
        </Link>
      </nav>

      {/* 3. Footer Section (User Card & Logout) */}
      <div className="mt-auto px-2 space-y-4 pt-4 bg-[#0A0E1A]">
        <Separator className="bg-cyan-900/20" />

        {/* User Badge */}
        <Link href="/admin/profile">
          <div className="flex items-center gap-3 py-2">
            <div className="relative">
              <Avatar className="size-11 border-2 border-slate-800">
                <AvatarImage src="/user.png" alt="DULA .JR" />
                <AvatarFallback className="bg-slate-800 text-white">
                  DJ
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 border-2 border-[#0A0E1A] rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-white font-bold text-base leading-tight truncate">
                DULA .JR
              </span>
              <span className="text-slate-500 text-[10px] truncate max-w-[140px]">
                mohamedadelq17@gmail.com
              </span>
            </div>
          </div>
        </Link>

        {/* Logout Action */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 rounded-xl font-bold h-10 px-2 group"
        >
          <LogOut className="size-5 rotate-180 transition-transform group-hover:translate-x-1" />
          Log out
        </Button>
      </div>
    </aside>
  );
}
