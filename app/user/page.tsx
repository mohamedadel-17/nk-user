import { Cards } from "@/src/components/dashboard/cards";
import { LeaksTable } from "@/src/components/dashboard/leaksTable";
import { OrgCard } from "@/src/components/dashboard/orgCard";
export default function Home() {
  return (
    <div className="space-y-6">
      <Cards />
      <LeaksTable />
    </div>
  );
}
