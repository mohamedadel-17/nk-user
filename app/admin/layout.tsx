// app/dashboard/layout.tsx
import { Navbar } from "@/src/components/dashboard/navBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col bg-[#0A0E1A]">
      <Navbar />

      <main className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        <div className="container mx-auto">{children}</div>
      </main>

      <footer className="border-t border-slate-800 py-4 text-center text-sm text-slate-500 bg-[#0A0E1A]">
        © 2026 N Leaks - All Rights Reserved
      </footer>
    </div>
  );
}
