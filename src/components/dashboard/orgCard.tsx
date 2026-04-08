import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { AddUser } from "./addUser";

interface OrgCardProps {
  showAddUser?: boolean;
}
export function OrgCard({ showAddUser = true }: OrgCardProps) {
  return (
    <div className="flex items-center justify-between bg-[#1C2541] p-6 rounded-2xl border border-slate-800 shadow-xl w-full">
      {/* Left section: Logo and information */}
      <div className="flex items-center gap-5">
        {/* logo */}
        <Image
          src="/visa.png"
          alt="Visa Logo"
          width={50}
          height={50}
          className="object-cover rounded-2xl size-20"
        />

        {/* Information block */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              VISA Corporation
            </h2>
            {/* Badge component from shadcn or a simple style for Pro */}
            <div className="bg-cyan-950/50 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-cyan-800">
              Pro
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-300 text-sm">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />{" "}
              <span className="font-semibold text-white">Status:</span>
              <span className="text-emerald-400 font-medium">Active</span>
            </div>
            <div>
              <span className="font-semibold text-white">Created:</span>
              <span className="text-slate-400 ml-1.5">Jan 12, 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right section: Add user button */}
      {showAddUser && (
        <div className="flex items-center">
          <AddUser />
        </div>
      )}
    </div>
  );
}
