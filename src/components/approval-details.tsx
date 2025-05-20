"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, X } from "lucide-react"
import { useState } from "react"

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

interface ApprovalDetailsProps {
  approval: PendingApproval
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function ApprovalDetails({ approval, onApprove, onReject }: ApprovalDetailsProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleApprove = async () => {
    setIsProcessing(true)
    await onApprove(approval.residentId)
    setIsProcessing(false)
  }

  const handleReject = async () => {
    setIsProcessing(true)
    await onReject(approval.residentId)
    setIsProcessing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-brown-600">Residence Application Details</CardTitle>
        <CardDescription>Review resident information before approval</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Resident Information</h3>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-gray-900">
                {approval.firstname} {approval.lastname}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{approval.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-gray-900">{approval.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">CNIC</p>
              <p className="text-gray-900">{approval.cnic || "Not provided"}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Residence Information</h3>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-gray-900">{approval.residence.addressLine1 || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Block/Sector</p>
              <p className="text-gray-900">{approval.residence.block || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Residence</p>
              <p className="text-gray-900">{approval.residence.residence || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Residence Type</p>
              <p className="text-gray-900">{approval.residence.residenceType || "Not specified"}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={handleReject}
          disabled={isProcessing}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <X className="mr-2 h-4 w-4" />
          Reject
        </Button>
        <Button onClick={handleApprove} disabled={isProcessing} className="bg-brown-600 hover:bg-brown-700">
          <Check className="mr-2 h-4 w-4" />
          Approve
        </Button>
      </CardFooter>
    </Card>
  )
}
