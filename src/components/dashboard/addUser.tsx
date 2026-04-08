"use client"

import * as React from "react"
import { X, Send, UserPlus } from "lucide-react" // Import Icons
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddUser() {
  // Form Logic
  const [email, setEmail] = React.useState("")
  const [role, setRole] = React.useState("")

  const handleSendInvitation = () => {
    // Add Backend API call logic here
    console.log("Sending invite to:", email, "with role:", role)
    // You can also programmatically close the modal here if needed
  }

  return (
    <Dialog>
      {/* 1. Trigger Button - Opens the modal */}
      <DialogTrigger asChild>
        <Button className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-semibold px-6 py-2.5 rounded-md flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>

      {/* 2. Modal Content and Styling (Matching the design) */}
      <DialogContent className="bg-[#111622] border-slate-800 text-white max-w-md p-0 overflow-hidden rounded-md shadow-2xl">
        
        {/* Modal Header with red close button */}
        <div className="p-6 pb-2 flex justify-between items-center">
          <DialogTitle className="text-2xl font-bold tracking-tight text-white">Add New User</DialogTitle>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Divider line */}
          <hr className="border-slate-800" />

          {/* Email Address Section */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300 font-medium">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1C2541] border-none text-white placeholder:text-slate-500 h-12 rounded-md focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
          </div>

          {/* Assign Role Section */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-slate-300 font-medium">Assign Role</Label>
            <Select onValueChange={setRole}>
              <SelectTrigger className="bg-[#1C2541] border-none text-white h-12 rounded-md focus:ring-1 focus:ring-cyan-500/50">
                <SelectValue placeholder="Viewer" />
              </SelectTrigger>
              <SelectContent className="bg-[#1C2541] border-slate-800 text-white">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Divider line */}
          <hr className="border-slate-800" />
        </div>

        {/* Footer Buttons */}
        <div className="p-6 pt-2 flex justify-end gap-3 bg-[#0d121c]">
          <DialogClose asChild>
            <Button variant="ghost" className="bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white px-6 h-11 rounded-md">
              Cancel
            </Button>
          </DialogClose>
          
          <Button 
            onClick={handleSendInvitation}
            className="bg-slate-800 text-white hover:bg-slate-700 px-6 h-11 rounded-md flex items-center gap-2.5 border border-slate-700"
          >
            <Send className="h-4 w-4 rotate-12" />
            Send Invitation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}