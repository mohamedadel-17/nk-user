"use client"

import * as React from "react"
import { Send, MailPlus } from "lucide-react"
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

export function AddEmail() {
  // Logic
  const [email, setEmail] = React.useState("")

  const handleAddEmail = () => {
    // Add Backend API call logic here
    console.log("Adding new email address:", email)
  }

  return (
    <Dialog>
      {/* 1. Trigger Button - Same Style as Add User but for Email */}
      <DialogTrigger asChild>
        <Button className="bg-[#1C2541] hover:bg-[#262c3a] text-slate-200 px-5 py-2 rounded-md text-sm flex items-center gap-2 transition-colors border border-slate-800">
          <MailPlus className="size-4" />
          Add Email Address
        </Button>
      </DialogTrigger>

      {/* 2. Modal Content - EXACT SAME STYLE as Add User */}
      <DialogContent className="bg-[#111622] border-slate-800 text-white max-w-md p-0 overflow-hidden rounded-md shadow-2xl">
        
        {/* Modal Header */}
        <div className="p-6 pb-2 flex justify-between items-center">
          <DialogTitle className="text-2xl font-bold tracking-tight text-white">Add Email Address</DialogTitle>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Divider line */}
          <hr className="border-slate-800" />

          {/* Email Address Section */}
          <div className="space-y-2">
            <Label htmlFor="new-email" className="text-slate-300 font-medium">New Email Address</Label>
            <Input
              id="new-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1C2541] border-none text-white placeholder:text-slate-500 h-12 rounded-md focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            />
            <p className="text-[10px] text-slate-500 italic">This email will be used for notifications and security alerts.</p>
          </div>

          {/* Divider line */}
          <hr className="border-slate-800" />
        </div>

        {/* Footer Buttons - Same Background as Add User */}
        <div className="p-6 pt-2 flex justify-end gap-3 bg-[#0d121c]">
          <DialogClose asChild>
            <Button variant="ghost" className="bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white px-6 h-11 rounded-md">
              Cancel
            </Button>
          </DialogClose>
          
          <Button 
            onClick={handleAddEmail}
            className="bg-slate-800 text-white hover:bg-slate-700 px-6 h-11 rounded-md flex items-center gap-2.5 border border-slate-700"
          >
            <Send className="h-4 w-4 rotate-12" />
            Add Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}