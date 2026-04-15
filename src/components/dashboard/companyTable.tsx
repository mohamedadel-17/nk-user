"use client";

import * as React from "react";
import { Search, Plus, Download, ChevronRight, Filter } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Initial Data for Companies
const initialCompaniesData = [
  {
    name: "Acme Corporation",
    plan: "Enterprise",
    status: "Active",
    records: "1,204",
    date: "2024-05-10",
  },
  {
    name: "Globex",
    plan: "Pro",
    status: "Pending",
    records: "0",
    date: "2024-05-10",
  },
  {
    name: "Soylent Corp",
    plan: "Starter",
    status: "Suspended",
    records: "342",
    date: "2024-05-10",
  },
  {
    name: "Umbrella",
    plan: "Enterprise",
    status: "Active",
    records: "89,201",
    date: "2025-01-15",
  },
];

export function CompanyTable() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filteredData = initialCompaniesData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* --- Header Section (Aligned with Company Management Style) --- */}
      <div className="flex justify-between items-start">
        <p className="text-2xl text-cyan-400">
          {filteredData.length} Companies
        </p>
        <Button className="bg-[#1C2541] hover:bg-slate-700 text-slate-300 border-none gap-2 rounded-md h-11 px-6 transition-all shadow-none">
          <Plus className="size-5" /> Add Company
        </Button>
      </div>

      {/* --- Filter Section (Exact match to your Leaks Style) --- */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search companies by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1C2541] border-none pl-10 text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-slate-700 shadow-none outline-none"
            style={{ backgroundColor: "#1C2541" }}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <Select onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger
              className="w-[130px] bg-[#1C2541] border-none text-slate-300 h-11 rounded-md"
              style={{ backgroundColor: "#1C2541" }}
            >
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#1C2541] border-slate-800 text-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          {/* Export Button */}
          <Button
            variant="outline"
            className="bg-[#1C2541] border-none hover:bg-slate-700 text-slate-300 gap-2 rounded-md px-5"
            style={{ backgroundColor: "#1C2541" }}
          >
            <Download className="size-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* --- The Table (Matching Leaks Table Theme) --- */}
      <div className="rounded-xl border border-slate-800 bg-[#0b101a] overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-[#1C2541]">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-white font-medium py-4 px-6">
                Company Name
              </TableHead>
              <TableHead className="text-white font-medium">Plan</TableHead>
              <TableHead className="text-white font-medium text-center">
                Status
              </TableHead>
              <TableHead className="text-white font-medium text-center">
                Leaked Records
              </TableHead>
              <TableHead className="text-white font-medium text-center">
                Date Added
              </TableHead>
              <TableHead className="text-white font-medium text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow
                  key={index}
                  className="border-slate-800 hover:bg-[#161b26]/50 transition-colors"
                >
                  <TableCell className="text-slate-200 font-medium py-4 px-6">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">
                    {row.plan}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[11px] font-medium flex items-center justify-center w-fit mx-auto gap-1.5 border",
                        row.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : row.status === "Pending"
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20",
                      )}
                    >
                      <div
                        className={cn(
                          "size-1.5 rounded-full",
                          row.status === "Active"
                            ? "bg-emerald-500"
                            : row.status === "Pending"
                              ? "bg-orange-500"
                              : "bg-red-500",
                        )}
                      />
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm text-center">
                    {row.records}
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm text-center">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-cyan-300 hover:bg-cyan-500/5 transition-all text-xs"
                    >
                      View Details & Edit{" "}
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-20 text-slate-500"
                >
                  No companies found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
