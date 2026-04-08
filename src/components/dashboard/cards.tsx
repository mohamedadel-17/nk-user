import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Activity, Users, ShieldAlert, AlertTriangle } from "lucide-react"

const statsData = [
  {
    title: "Your Account status",
    value: "Safe",
    statusText: "Verified",
    statusColor: "text-emerald-400",
    bgColor: "bg-emerald-950/50",
    icon: ShieldCheck,
    iconColor: "text-emerald-500",
  },
  {
    title: "Monitoring",
    value: "Active",
    statusText: "Real-time scanning on.",
    statusColor: "text-slate-400",
    icon: Activity,
    iconColor: "text-emerald-500",
  },
  {
    title: "Total Users",
    value: "124",
    icon: Users,
    iconColor: "text-cyan-400",
  },
  {
    title: "Total Leaks",
    value: "12",
    icon: ShieldAlert,
    iconColor: "text-orange-500",
  },
  {
    title: "High Risk Leaks",
    value: "3",
    statusText: "High-risk data detected",
    statusColor: "text-slate-400",
    icon: AlertTriangle,
    iconColor: "text-red-600",
    showBar: true,
  },
]

export function Cards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {statsData.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="bg-[#1C2541] border-slate-800" style={{ height: '140px' }}>
            <CardContent className="flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-300 max-w-[70%]">
                  {stat.title}
                </p>
                <Icon className={`h-8 w-8 ${stat.iconColor}`} />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-end gap-2">
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {stat.value}
                  </h2>
                  {stat.showBar && (
                    <div className="flex gap-0.5 mb-1.5">
                      <div className="h-4 w-1 bg-red-600 rounded"></div>
                      <div className="h-4 w-1 bg-red-600/50 rounded"></div>
                    </div>
                  )}
                </div>
                
                {stat.statusText && (
                  <p className={`text-xs ${stat.statusColor} flex items-center gap-1.5`}>
                    {stat.title === "Your Account status" && (
                        <span className={`inline-block px-2 py-0.5 rounded-full ${stat.bgColor} border border-emerald-900`}>
                            {stat.statusText}
                        </span>
                    )}
                    {stat.title === "Monitoring" && (
                        <>
                           <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                           {stat.statusText}
                        </>
                    )}
                    {(stat.title !== "Your Account status" && stat.title !== "Monitoring") && (
                        stat.statusText
                    )}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}