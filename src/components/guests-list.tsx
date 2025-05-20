"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"
import { formatDate } from "@/lib/utils"

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

interface GuestsListProps {
  guests: Guest[]
  selectedId: string | undefined
  onSelect: (guest: Guest) => void
}

export function GuestsList({ guests, selectedId, onSelect }: GuestsListProps) {
  if (guests.length === 0) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
        <p className="text-center text-gray-500">No guests found</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[500px] rounded-md border border-gray-200 bg-white">
      <div className="divide-y divide-gray-200">
        {guests.map((guest) => (
          <button
            key={guest.guestId}
            className={`w-full cursor-pointer p-4 text-left transition-colors hover:bg-gray-50 ${
              selectedId === guest.guestId ? "bg-brown-50" : ""
            }`}
            onClick={() => onSelect(guest)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{guest.guestName}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {guest.residence?.addressLine1 || "No address"}, {guest.residence?.block || ""}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">ETA: {formatDate(guest.eta)}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`${guest.visitCompleted ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}
              >
                {guest.visitCompleted ? "Verified" : "Pending"}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
