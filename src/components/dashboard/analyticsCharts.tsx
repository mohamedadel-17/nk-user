"use client"

import * as React from "react"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Sector 
} from "recharts"
import { Database } from "lucide-react"

// Top 5 Companies
const companyData = [
  { name: "OLED", value: 93, color: "#8B5CF6" }, // Purple
  { name: "PATH", value: 85, color: "#10B981" }, // Green
  { name: "DUOL", value: 53, color: "#F59E0B" }, // Orange
  { name: "FTNT", value: 43, color: "#06B6D4" }, // Cyan
  { name: "TTEK", value: 26, color: "#6366F1" }, // Indigo
]

// Domain Analysis
const domainData = [
  { name: ".org", value: 30, color: "#A855F7" },
  { name: ".gov", value: 15, color: "#F97316" },
  { name: ".net", value: 25, color: "#EF4444" },
  { name: ".com", value: 20, color: "#EC4899" },
  { name: "Others", value: 10, color: "#10B981" },
]

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* --- Card 1: Top 5 Company Leaks --- */}
      <div className="bg-[#1C2541] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white tracking-tight pl-3">
            Top 5 company have leaks
          </h3>
        </div>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={companyData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={120}
                paddingAngle={0}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {companyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1C2541', border: 'none', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Card 2: Domain Analysis --- */}
      <div className="bg-[#1C2541] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white tracking-tight">Domain Analysis</h3>
        </div>

        <div className="h-[300px] w-full relative">
          {/* Central Info (Available Leaks) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 pt-8">
             <Database className="size-6 text-slate-400 mb-1" />
             <span className="text-xl font-bold text-white">1.2M</span>
             <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Available Leaks</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={domainData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {domainData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend (Matching image style) */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {domainData.map((item) => (
            <div key={item.name} className="flex items-center gap-2 bg-[#1C2541] px-3 py-1.5 rounded-lg border border-slate-800">
              <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-300 font-medium">
                {item.name}-{item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}