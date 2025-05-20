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
import { AlertCircle, Car } from "lucide-react"

interface Vehicle {
  id: string
  make: string
  model: string
  color: string
  licensePlate: string
  lastEntry?: string
}

interface VehiclesModalProps {
  userId: string
  onClose: () => void
}

export function VehiclesModal({ userId, onClose }: VehiclesModalProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      // In a real implementation, you would fetch from an API
      // For now, we'll simulate with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockVehicles = [
        {
          id: "veh_1",
          make: "Toyota",
          model: "Corolla",
          color: "White",
          licensePlate: "ABC-123",
          lastEntry: "2023-05-15T14:30:00Z",
        },
        {
          id: "veh_2",
          make: "Honda",
          model: "Civic",
          color: "Black",
          licensePlate: "XYZ-789",
          lastEntry: "2023-05-14T09:15:00Z",
        },
      ]

      setVehicles(mockVehicles)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching vehicles")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleString()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-brown-600">User Vehicles</DialogTitle>
          <DialogDescription>Vehicles registered to this user and their entry records</DialogDescription>
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
          ) : vehicles.length > 0 ? (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-start rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                    <Car className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Make & Model</p>
                        <p className="text-gray-900">
                          {vehicle.make} {vehicle.model}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">License Plate</p>
                        <p className="text-gray-900">{vehicle.licensePlate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Color</p>
                        <p className="text-gray-900">{vehicle.color}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Last Entry</p>
                        <p className="text-gray-900">{formatDate(vehicle.lastEntry)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
              <p className="text-center text-gray-500">No vehicles found for this user</p>
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
