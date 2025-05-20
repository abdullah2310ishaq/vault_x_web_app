"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { VehiclesList } from "@/components/vehicles-list"
import { VehicleDetails } from "@/components/vehicle-details"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Search } from "lucide-react"
import { getToken } from "@/lib/auth"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"

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

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchVehicles()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredVehicles(vehicles)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = vehicles.filter(
        (vehicle) =>
          vehicle.make.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query) ||
          vehicle.color.toLowerCase().includes(query) ||
          vehicle.licensePlate.toLowerCase().includes(query) ||
          (vehicle.userName && vehicle.userName.toLowerCase().includes(query)),
      )
      setFilteredVehicles(filtered)
    }
  }, [searchQuery, vehicles])

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const token = getToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicle/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch vehicles")
      }

      const data = await response.json()
      setVehicles(data)
      setFilteredVehicles(data)
      if (data.length > 0) {
        setSelectedVehicle(null) // Don't auto-select, let user click
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching vehicles")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-brown-600">Vehicles</h1>
        <p className="mt-2 text-gray-400">View and manage all vehicles in the society</p>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search vehicles by make, model, color, license plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
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
                <VehiclesList
                  vehicles={filteredVehicles}
                  selectedId={selectedVehicle?.id}
                  onSelect={setSelectedVehicle}
                />
              )}
            </div>
            <div className="lg:col-span-2">
              {loading ? (
                <Skeleton className="h-[500px] w-full rounded-md" />
              ) : selectedVehicle ? (
                <VehicleDetails vehicle={selectedVehicle} />
              ) : (
                <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
                  <p className="text-center text-gray-500">
                    {filteredVehicles.length === 0 ? "No vehicles found" : "Select a vehicle to view details"}
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
