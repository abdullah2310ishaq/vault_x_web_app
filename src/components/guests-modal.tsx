"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, User } from "lucide-react"

interface Guest {
  id: string
  name: string
  cnic?: string
  phone?: string
  purpose: string
  entryTime: string
  exitTime?: string
}

interface GuestsModalProps {
  userId: string
  onClose: () => void
}

export function GuestsModal({ userId, onClose }: GuestsModalProps) {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    setLoading(true)
    try {
      // In a real implementation, you would fetch from an API
      // For now, we'll simulate with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockGuests = [
        {
          id: "guest_1",
          name: "Ahmed Khan",
          cnic: "12345-1234567-1",
          phone: "0300-1234567",
          purpose: "Family Visit",
          entryTime: "2023-05-15T14:30:00Z",
          exitTime: "2023-05-15T18:45:00Z",
        },
        {
          id: "guest_2",
          name: "Sara Ali",
          cnic: "54321-7654321-0",
          phone: "0321-7654321",
          purpose: "Delivery",
          entryTime: "2023-05-14T09:15:00Z",
        },
      ]

      setGuests(mockGuests)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching guests")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not recorded"
    return new Date(dateString).toLocaleString()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-brown-600">User Guests</DialogTitle>
          <DialogDescription>Guests who have visited this user</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-md" />
              ))}
            </div>
          ) : guests.length > 0 ? (
            <div className="space-y-4">
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-start rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="text-gray-900">{guest.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">CNIC</p>
                        <p className="text-gray-900">{guest.cnic || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-900">{guest.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Purpose</p>
                        <p className="text-gray-900">{guest.purpose}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Entry Time</p>
                        <p className="text-gray-900">{formatDate(guest.entryTime)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Exit Time</p>
                        <p className="text-gray-900">{formatDate(guest.exitTime)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
              <p className="text-center text-gray-500">No guests found for this user</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
