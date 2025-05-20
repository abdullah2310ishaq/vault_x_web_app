"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ApprovalsList } from "@/components/approvals-list"
import { ApprovalDetails } from "@/components/approval-details"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { getToken } from "@/lib/auth"
import { Skeleton } from "@/components/ui/skeleton"

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

export default function ApprovalsPage() {
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([])
  const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchPendingApprovals()
  }, [])

  const fetchPendingApprovals = async () => {
    setLoading(true)
    try {
      const token = getToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/approval/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          // No pending approvals is not an error
          setPendingApprovals([])
          setSelectedApproval(null)
          return
        }
        throw new Error("Failed to fetch pending approvals")
      }

      const data = await response.json()
      setPendingApprovals(data)
      if (data.length > 0) {
        setSelectedApproval(data[0])
      } else {
        setSelectedApproval(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching pending approvals")
    } finally {
      setLoading(false)
    }
  }
const handleApprove = async (residentId: string) => {
  try {
    const token = getToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/approve/${residentId}`, {
      method: "PATCH",  // Make sure this is PATCH, not POST
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to approve resident")
    }

    // Refresh the list after approval
    await fetchPendingApprovals()
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred during approval")
  }
}

  const handleReject = async (residentId: string) => {
    // In a real implementation, you would call an API endpoint to reject the resident
    // For now, we'll just show a success message and refresh the list
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remove the rejected approval from the list
      setPendingApprovals((prev) => prev.filter((approval) => approval.residentId !== residentId))

      // If the rejected approval was selected, select another one or set to null
      if (selectedApproval?.residentId === residentId) {
        const remaining = pendingApprovals.filter((approval) => approval.residentId !== residentId)
        setSelectedApproval(remaining.length > 0 ? remaining[0] : null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during rejection")
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-brown-600">Pending Approvals</h1>
        <p className="mt-2 text-gray-400">Review and approve resident registration requests</p>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-md" />
                ))}
              </div>
            ) : (
              <ApprovalsList
                approvals={pendingApprovals}
                selectedId={selectedApproval?.residentId}
                onSelect={(approval) => setSelectedApproval(approval)}
              />
            )}
          </div>
          <div className="lg:col-span-2">
            {loading ? (
              <Skeleton className="h-[500px] w-full rounded-md" />
            ) : selectedApproval ? (
              <ApprovalDetails
                approval={selectedApproval}
                onApprove={(id) => handleApprove(id)}
                onReject={(id) => handleReject(id)}
              />
            ) : (
              <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
                <p className="text-center text-gray-500">
                  {pendingApprovals.length === 0
                    ? "No pending approvals at the moment"
                    : "Select a resident approval request to view details"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
