"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut, Bell } from "lucide-react";
  
interface NavbarProps {
  role?: "admin" | "user";
}

export function Navbar({ role }: NavbarProps) {
  return (
    <header className="border-b bg-[#0A0E1A] text-white">
      {" "}
      {/* Dark background to suit N Leaks */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left section: Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="NLeaks Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Middle section: Links */}
        <div className="flex items-center gap-6">
          <Link href={`/${role}`}>
            <Button
              variant="ghost"
              className="hover:bg-slate-800 hover:text-white cursor-pointer"
            >
              Home
            </Button>
          </Link>
          {role === "admin" && (
          <Link href="/admin/subscription">
            <Button
              variant="ghost"
              className="hover:bg-slate-800 hover:text-white cursor-pointer"
            >
              Subscription
            </Button>
          </Link>
          )}
        </div>

        {/* Right section: Profile and icons */}
        <div className="flex items-center gap-4">
          <Link href={`/${role}/profile`}>
            <div className="flex items-center gap-3 bg-slate-900/50 p-1 pr-3 rounded-full border border-slate-800">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/user.png" alt="Salah Ahmed" />
                <AvatarFallback className="bg-slate-700">SA</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-cyan-400">
                Salah Ahmed
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 ml-2">
            <Settings className="h-5 w-5 text-cyan-400 cursor-pointer hover:rotate-45 transition-transform" />
            <Bell className="h-5 w-5 text-cyan-400 cursor-pointer" />
            <LogOut className="h-5 w-5 text-cyan-400 cursor-pointer hover:text-red-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
