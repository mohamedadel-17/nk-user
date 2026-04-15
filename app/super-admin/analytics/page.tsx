import { Cards } from "@/src/components/dashboard/cards";
import { AnalyticsCharts } from "@/src/components/dashboard/analyticsCharts";
export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Data Insights</h1>
      <Cards />
      <AnalyticsCharts />
    </div>
  );
}
