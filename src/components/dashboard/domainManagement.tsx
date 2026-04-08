"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DomainManagementProps {
  initialDomains?: string[];
  onChange?: (domains: string[]) => void;
  className?: string;
}

export function DomainManagement({ 
  initialDomains = [], 
  onChange,
  className 
}: DomainManagementProps) {
  // 1. State for the domain list and current input value
  const [domains, setDomains] = React.useState<string[]>(initialDomains)
  const [inputValue, setInputValue] = React.useState("")

  // 2. Notify Parent component whenever domains list changes
  React.useEffect(() => {
    if (onChange) onChange(domains)
  }, [domains, onChange])

  // 3. Logic to add a new domain
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmedValue = inputValue.trim().toLowerCase()
      
      // Prevent duplicates and empty values
      if (trimmedValue && !domains.includes(trimmedValue)) {
        setDomains([...domains, trimmedValue])
        setInputValue("")
      }
    } else if (e.key === "Backspace" && !inputValue && domains.length > 0) {
      // UX Feature: Remove the last domain if Backspace is pressed and input is empty
      removeDomain(domains[domains.length - 1])
    }
  }

  const removeDomain = (domainToRemove: string) => {
    setDomains(domains.filter((d) => d !== domainToRemove))
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div 
        className="flex flex-wrap gap-2 p-3 bg-[#1C2541] rounded-md border border-transparent focus-within:ring-1 focus-within:ring-cyan-500/50 transition-all min-h-[52px] items-center"
      >
        {/* Render domain badges */}
        {domains.map((domain) => (
          <Badge 
            key={domain}
            variant="secondary"
            className="bg-[#0A0E17] text-slate-300 border-slate-800 px-3 py-1.5 rounded-md flex items-center gap-2 group animate-in fade-in zoom-in duration-200"
          >
            {domain}
            <button
              type="button"
              onClick={() => removeDomain(domain)}
              className="hover:text-red-500 transition-colors"
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}

        {/* Dynamic input field */}
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={domains.length === 0 ? "Add domain..." : ""}
          className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500 min-w-[120px]"
        />
      </div>
      <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
        Press Enter to confirm domain
      </p>
    </div>
  )
}