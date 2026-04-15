"use client"

import * as React from "react"
import Image from "next/image"
import { Lock, Mail } from "lucide-react" // Icons
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AddEmail } from "@/src/components/dashboard/addEmail";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProfileSettingPage() {
  return (
    // Main Container with dark background
      <div className="space-y-10">
        
        {/* -- Header Section -- */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight">Profile Setting</h1>
          <Button className="bg-[#1C2541] hover:bg-[#262c3a] text-slate-200 px-6 py-2 rounded-lg text-sm transition-colors">
            Save
          </Button>
        </div>

        {/* -- Avatar & Name Section -- */}
        <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
          {/* Circular Avatar with Border */}
          <div className="size-24 rounded-full border-2 border-slate-700 overflow-hidden relative">
            <Image 
              src="/user.png"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
          {/* User Display Name */}
          <h2 className="text-5xl font-extrabold tracking-tighter">DULA .JR</h2>
        </div>

        {/* -- Form Grid Section -- */}
        {/* Using a 2-column grid for standard screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          
          {/* Full Name Input */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-200 font-medium">Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="Mohamed Adel" 
              className="bg-[#1C2541] border-none text-white h-12 rounded-xl placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>

          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-200 font-medium">Username</Label>
            <Input 
              id="username" 
              placeholder="dula_jr17" 
              className="bg-[#1C2541] border-none text-white h-12 rounded-xl placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>

          {/* Gender Select */}
          <div className="space-y-2 relative">
            <Label htmlFor="gender" className="text-slate-200 font-medium">Gender</Label>
            <Select defaultValue="male">
              <SelectTrigger className="bg-[#1C2541] border-none text-white h-12 rounded-xl focus:ring-1 focus:ring-cyan-500/50">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="bg-[#1C2541] border-slate-800 text-white">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Country Input */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-slate-200 font-medium">Country</Label>
            <Input 
              id="country" 
              placeholder="Egypt" // Placeholder matches image
              className="bg-[#1C2541] border-none text-white h-12 rounded-xl placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-200 font-medium">Phone Number</Label>
            <Input 
              id="phone" 
              placeholder="+201208005877" 
              className="bg-[#1C2541] border-none text-white h-12 rounded-xl placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>

          {/* Language Input */}
          <div className="space-y-2">
            <Label htmlFor="language" className="text-slate-200 font-medium">Language</Label>
            <Input 
              id="language" 
              placeholder="English" 
              className="bg-[#1C2541] border-none text-white h-12 rounded-xl placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>

          {/* Position Input (Disabled with Lock) */}
          <div className="space-y-2">
            <Label htmlFor="position" className="text-slate-200 font-medium flex items-center gap-1.5">
              Position <Lock className="size-3.5 text-slate-400" />
            </Label>
            <Input 
              id="position" 
              placeholder="Software Engineer" 
              disabled // Makes it un-editable
              className="bg-slate-700 border-none text-slate-200 h-12 rounded-xl placeholder:text-slate-400 disabled:opacity-100 cursor-not-allowed"
            />
          </div>

          {/* Company Input (Disabled with Lock) */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-200 font-medium flex items-center gap-1.5">
              Company <Lock className="size-3.5 text-slate-400" />
            </Label>
            <Input 
              id="company" 
              placeholder="TechCrop" 
              disabled // Makes it un-editable
              className="bg-slate-700 border-none text-slate-200 h-12 rounded-xl placeholder:text-slate-400 disabled:opacity-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* -- Email Section -- */}
        <div className="space-y-5 pt-4">
          <h3 className="text-3xl font-semibold text-white tracking-tight">My email Address</h3>
          
          {/* Current Email Block */}
          <div className="flex items-center gap-4 bg-[#111622] p-3 rounded-2xl w-fit border border-slate-800">
            {/* Email Icon in Box */}
            <div className="bg-[#1C2541] p-3 rounded-xl flex items-center justify-center">
                <Mail className="size-6 text-slate-300" />
            </div>
            {/* Current Email */}
            <span className="text-slate-200 text-sm pr-4">mohamedadelq17@gmail.com</span>
          </div>

          {/* Add Email Button */}
          <AddEmail />
        </div>

      </div>
  )
}