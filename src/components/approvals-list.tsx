"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Residence {
  addressLine1?: string
  block?: string
  residence?: string
  residenceType?: string
}

interface PendingApproval {
  residentId: string
  firstname: string
  lastname: string
  cnic: string
  email: string
  phone: string
  residence: Residence
}

interface ApprovalsListProps {
  approvals: PendingApproval[]
  selectedId: string | undefined
  onSelect: (approval: PendingApproval) => void
}

export function ApprovalsList({ approvals, selectedId, onSelect }: ApprovalsListProps) {
  if (approvals.length === 0) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
        <p className="text-center text-gray-500">No pending approvals</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[500px] rounded-md border border-gray-200 bg-white">
      <div className="divide-y divide-gray-200">
        {approvals.map((approval) => (
          <button
            key={approval.residentId}
            className={`w-full cursor-pointer p-4 text-left transition-colors hover:bg-gray-50 ${
              selectedId === approval.residentId ? "bg-brown-50" : ""
            }`}
            onClick={() => onSelect(approval)}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {approval.firstname} {approval.lastname}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {approval.residence.addressLine1 || approval.residence.block || "No address provided"}
                </p>
                <p className="mt-1 text-xs text-gray-400">{approval.cnic}</p>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                Pending
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
