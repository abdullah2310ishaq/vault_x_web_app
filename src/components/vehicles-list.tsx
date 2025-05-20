"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Car } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Vehicle {
  id: string
  make: string
  model: string
  color: string
  licensePlate: string
  userId: string
  userName?: string
  lastEntry?: string
  lastExit?: string
}

interface VehiclesListProps {
  vehicles: Vehicle[]
  selectedId: string | undefined
  onSelect: (vehicle: Vehicle) => void
}

export function VehiclesList({ vehicles, selectedId, onSelect }: VehiclesListProps) {
  if (vehicles.length === 0) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
        <p className="text-center text-gray-500">No vehicles found</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[500px] rounded-md border border-gray-200 bg-white">
      <div className="divide-y divide-gray-200">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle.id}
            className={`w-full cursor-pointer p-4 text-left transition-colors hover:bg-gray-50 ${
              selectedId === vehicle.id ? "bg-brown-50" : ""
            }`}
            onClick={() => onSelect(vehicle)}
          >
            <div className="flex items-start">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                <Car className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {vehicle.make} {vehicle.model}
                </p>
                <p className="mt-1 text-sm text-gray-500">{vehicle.licensePlate}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {vehicle.lastEntry ? `Last entry: ${formatDate(vehicle.lastEntry)}` : "No entry records"}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
