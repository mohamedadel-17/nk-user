"use client";

import * as React from "react";
import { format, isSameDay, parse } from "date-fns";
import {
  Calendar as CalendarIcon,
  Filter,
  Search,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// replace it with data from the API later
const initialLeaksData = [
  {
    id: "13NA/70/001",
    name: "Dula",
    email: "mohamed@gmail.com",
    date: "5/1/2026",
    status: "Active",
    lastCheck: "3 hours ago",
  },
  {
    id: "13NA/70/002",
    name: "Ahmed",
    email: "ahmed@gmail.com",
    date: "6/1/2026",
    status: "Inactive",
    lastCheck: "2 days ago",
  },
  {
    id: "13NA/70/003",
    name: "Salah",
    email: "salah@gmail.com",
    date: "7/1/2026",
    status: "Unverified",
    lastCheck: "3 hours ago",
  },
  {
    id: "13NA/70/013",
    name: "Adel",
    email: "adel@gmail.com",
    date: "5/1/2026",
    status: "Unverified",
    lastCheck: "3 hours ago",
  },
  {
    id: "13NA/70/033",
    name: "Youssef",
    email: "youssef@gmail.com",
    date: "8/1/2026",
    status: "Inactive",
    lastCheck: "3 hours ago",
  },
];

export function LeaksTable() {
  // --- States for Filters ---
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  // --- Logic Filtering ---
  const filteredData = initialLeaksData.filter((item) => {
    // 1. Search filter (name, email, or ID)
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Status filter
    const matchesStatus =
      statusFilter === "all" ||
      item.status.toLowerCase() === statusFilter.toLowerCase();

    // 3. Date filter
    let matchesDate = true;
    if (selectedDate) {
      // Convert the text date (5/1/2026) to a Date object for comparison
      const itemDate = parse(item.date, "d/M/yyyy", new Date());
      matchesDate = isSameDay(itemDate, selectedDate);
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* --- Filter Section --- */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by name, email or ID..."
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
              className="w-[130px] bg-[#1C2541] border-none text-slate-300"
              style={{ backgroundColor: "#1C2541" }}
            >
              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#1C2541] border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-slate-700 shadow-none outline-none">
              <SelectItem
                value="all"
                className="focus:bg-slate-700 focus:text-white cursor-pointer"
              >
                All Status
              </SelectItem>
              <SelectItem
                value="active"
                className="focus:bg-slate-700 focus:text-white cursor-pointer"
              >
                Active
              </SelectItem>
              <SelectItem
                value="inactive"
                className="focus:bg-slate-700 focus:text-white cursor-pointer"
              >
                Inactive
              </SelectItem>
              <SelectItem
                value="unverified"
                className="focus:bg-slate-700 focus:text-white cursor-pointer"
              >
                Unverified
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Date Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal bg-[#1C2541] border-none hover:bg-slate-700 text-slate-300",
                  !selectedDate && "text-muted-foreground",
                )}
                style={{ backgroundColor: "#1C2541" }}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Filter by Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-[#1C2541] border-slate-800"
              align="end"
            >
              <div className="p-2 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Select Date</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-[10px]"
                  onClick={() => setSelectedDate(undefined)}
                >
                  Clear
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                classNames={{
                  day_selected: "bg-cyan-600 text-white hover:bg-cyan-600",
                  day_today: "bg-slate-800 text-cyan-400",
                  nav_button: "hover:bg-slate-700 text-slate-400",
                }}
                className="text-white bg-[#1C2541] rounded-md border-none"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* --- Filtered Table --- */}
      <div className="rounded-xl border border-slate-800 bg-[#0b101a] overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-[#1C2541]">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-white font-medium py-4 text-center">
                Id
              </TableHead>
              <TableHead className="text-white font-medium text-center">Name</TableHead>
              <TableHead className="text-white font-medium text-center">
                Email
              </TableHead>
              <TableHead className="text-white font-medium text-center">
                Date Found
              </TableHead>
              <TableHead className="text-white font-medium text-center">
                Status
              </TableHead>
              <TableHead className="text-white font-medium text-center">
                Last Check
              </TableHead>
              <TableHead className="text-white font-medium text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-slate-800 hover:bg-[#161b26]/50 transition-colors"
                >
                  <TableCell className="text-slate-300 font-mono text-[11px] py-4 text-center">
                    {row.id}
                  </TableCell>
                  <TableCell className="text-slate-300 font-medium text-center">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm text-center">
                    <span className="hover:underline cursor-pointer decoration-slate-600 underline-offset-4">
                      {row.email}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm text-center">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-[11px] font-medium",
                        row.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : row.status === "Inactive"
                            ? "bg-slate-500/10 text-slate-400"
                            : "bg-orange-500/10 text-orange-400",
                      )}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm text-center">
                    {row.lastCheck}
                  </TableCell>
                  <TableCell className="text-right text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      View <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-20 text-slate-500"
                >
                  No results found for your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
