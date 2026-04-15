import { Cards } from "@/src/components/dashboard/cards";
import { LeaksTable } from "@/src/components/dashboard/leaksTable";
export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Leak Intelligence</h1>
      <Cards />
      <LeaksTable />
    </div>
  );
}
