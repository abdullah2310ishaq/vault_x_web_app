"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { GuestsList } from "@/components/guests-list"
import { GuestDetails } from "@/components/guest-details"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Search, Filter } from "lucide-react"
import { getToken } from "@/lib/auth"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Vehicle {
  vehicleId?: string
  vehicleModel?: string
  vehicleLicensePlateNumber?: string
  vehicleColor?: string
  isGuest?: boolean
}

interface Guest {
  guestId: string
  guestName: string
  guestPhoneNumber?: string
  eta: string
  visitCompleted: boolean
  residence?: {
    id: string
    addressLine1?: string
    block?: string
  }
  guestVehicle?: Vehicle
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(true)

  useEffect(() => {
    fetchGuests()
  }, [])

  useEffect(() => {
    filterGuests()
  }, [searchQuery, showVerifiedOnly, guests])

  const filterGuests = () => {
    let filtered = [...guests]

    // Filter by verification status
    if (showVerifiedOnly) {
      filtered = filtered.filter((guest) => guest.visitCompleted)
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (guest) =>
          guest.guestName.toLowerCase().includes(query) ||
          (guest.guestPhoneNumber && guest.guestPhoneNumber.toLowerCase().includes(query)) ||
          (guest.guestVehicle?.vehicleLicensePlateNumber &&
            guest.guestVehicle.vehicleLicensePlateNumber.toLowerCase().includes(query)),
      )
    }

    setFilteredGuests(filtered)
  }

  const fetchGuests = async () => {
    setLoading(true)
    try {
      const token = getToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guest/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }

      const data = await response.json()

      // Add guestPhoneNumber and visitCompleted since they're not in the response
      const enhancedData = data.map((guest: any) => ({
        ...guest,
        guestPhoneNumber: guest.guestPhoneNumber || "N/A",
        visitCompleted: Math.random() > 0.5, // Mock data for visitCompleted
        residence: {
          id: "res_" + Math.random().toString(36).substring(7),
          addressLine1: "House " + Math.floor(Math.random() * 100),
          block: "Block " + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        },
      }))

      setGuests(enhancedData)
      filterGuests()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching guests")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-brown-600">Guests</h1>
        <p className="mt-2 text-gray-400">View and manage guest entries in the society</p>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-6">
          <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search guests by name, phone, or vehicle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked={showVerifiedOnly} onCheckedChange={setShowVerifiedOnly}>
                    Show verified guests only
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-md" />
                  ))}
                </div>
              ) : (
                <GuestsList guests={filteredGuests} selectedId={selectedGuest?.guestId} onSelect={setSelectedGuest} />
              )}
            </div>
            <div className="lg:col-span-2">
              {loading ? (
                <Skeleton className="h-[500px] w-full rounded-md" />
              ) : selectedGuest ? (
                <GuestDetails guest={selectedGuest} />
              ) : (
                <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
                  <p className="text-center text-gray-500">
                    {filteredGuests.length === 0
                      ? showVerifiedOnly
                        ? "No verified guests found"
                        : "No guests found"
                      : "Select a guest to view details"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
