import { CompanyTable } from "@/src/components/dashboard/companyTable";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Company Management</h1>
      <CompanyTable />

    </div>
  );
}
