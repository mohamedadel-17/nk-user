"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrgCard } from "@/src/components/dashboard/orgCard";
import { DomainManagement } from "@/src/components/dashboard/domainManagement";

export default function SubscriptionPage() {
  const handleDomainChange = (newDomains: string[]) => {
    console.log("Updated domains:", newDomains);
  };

  return (
    <div className="space-y-10">
      {/* -- Header Section -- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Company Subscription
        </h1>

        <div className="w-full md:w-1/2 scale-90 origin-right">
          <OrgCard />
        </div>
      </div>

      {/* -- Company Information Section -- */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-300">
          Company Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label className="text-slate-200">Company Name</Label>
            <Input
              placeholder="Acme Corporation"
              className="bg-[#1C2541] border-none text-white h-12 rounded-md focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label className="text-slate-200">Industry</Label>
            <Input
              placeholder="Tech"
              className="bg-[#1C2541] border-none text-white h-12 rounded-md focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>

          {/* Expected Users Count */}
          <div className="space-y-2">
            <Label className="text-slate-200">Expected Users Count</Label>
            <Input
              placeholder="130"
              className="bg-[#1C2541] border-none text-white h-12 rounded-md focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>

          {/* Admin Contact Email */}
          <div className="space-y-2">
            <Label className="text-slate-200">Admin Contact Email</Label>
            <Input
              placeholder="security@acme.inc"
              className="bg-[#1C2541] border-none text-white h-12 rounded-md focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>
        </div>
      </div>

      {/* -- Domain Management Section -- */}
      <DomainManagement
        initialDomains={["acme.inc", "acme-labs.io"]}
        onChange={handleDomainChange}
      />

      {/* -- Action Buttons (Footer) -- */}
      <div className="flex justify-end gap-4 pt-6">
        <Button
          variant="ghost"
          className="bg-[#1C2541] text-slate-300 hover:bg-[#262c3a] hover:text-white px-6 py-2 rounded-md"
        >
          Cancel
        </Button>

        <Button
          variant="ghost"
          className="bg-[#1C2541] text-slate-300 hover:bg-[#262c3a] hover:text-white px-6 py-2 rounded-md"
        >
          Save as Draft
        </Button>

        <Button className="bg-[#1C2541] text-white hover:bg-[#262c3a] px-6 py-2 rounded-md flex items-center gap-2 border border-slate-700">
          <Send className="size-4 rotate-12 text-slate-300" />
          Update Request
        </Button>
      </div>
    </div>
  );
}
