"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, User } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

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

interface VehicleEntry {
  id: string
  entryTime: string
  exitTime?: string
}

interface VehicleDetailsProps {
  vehicle: Vehicle
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  const [owner, setOwner] = useState<any>(null)
  const [entries, setEntries] = useState<VehicleEntry[]>([])
  const [loadingOwner, setLoadingOwner] = useState(true)
  const [loadingEntries, setLoadingEntries] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (vehicle) {
      fetchOwnerDetails()
      fetchVehicleEntries()
    }
  }, [vehicle])

  const fetchOwnerDetails = async () => {
    setLoadingOwner(true)
    try {
      // In a real implementation, you would fetch from an API
      // For now, we'll simulate with mock data
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mock data
      setOwner({
        userid: vehicle.userId,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phone: "0300-1234567",
        residences: [
          {
            id: "res_1",
            addressLine1: "House 123, Street 4",
            block: "Block A",
            residence: "Apartment 5",
            residenceType: "Apartment",
          },
        ],
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching owner details")
    } finally {
      setLoadingOwner(false)
    }
  }

  const fetchVehicleEntries = async () => {
    setLoadingEntries(true)
    try {
      // In a real implementation, you would fetch from an API
      // For now, we'll simulate with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data - last 5 entries
      setEntries([
        {
          id: "entry_1",
          entryTime: "2023-05-15T14:30:00Z",
          exitTime: "2023-05-15T18:45:00Z",
        },
        {
          id: "entry_2",
          entryTime: "2023-05-14T09:15:00Z",
          exitTime: "2023-05-14T17:20:00Z",
        },
        {
          id: "entry_3",
          entryTime: "2023-05-12T11:30:00Z",
          exitTime: "2023-05-12T13:15:00Z",
        },
        {
          id: "entry_4",
          entryTime: "2023-05-10T16:45:00Z",
          exitTime: "2023-05-10T19:30:00Z",
        },
        {
          id: "entry_5",
          entryTime: "2023-05-08T08:00:00Z",
          exitTime: "2023-05-08T18:00:00Z",
        },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching vehicle entries")
    } finally {
      setLoadingEntries(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-brown-600">Vehicle Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <h3 className="text-sm font-medium text-gray-500">Vehicle Information</h3>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Make</p>
              <p className="text-gray-900">{vehicle.make}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Model</p>
              <p className="text-gray-900">{vehicle.model}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Color</p>
              <p className="text-gray-900">{vehicle.color}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">License Plate</p>
              <p className="text-gray-900">{vehicle.licensePlate}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Owner Information</h3>
          {loadingOwner ? (
            <div className="mt-2 space-y-2">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          ) : owner ? (
            <div className="mt-2 flex items-start">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {owner.firstname} {owner.lastname}
                </p>
                <p className="text-sm text-gray-500">{owner.email}</p>
                <p className="text-sm text-gray-500">{owner.phone}</p>
                {owner.residences && owner.residences.length > 0 && (
                  <p className="text-sm text-gray-500">
                    {owner.residences[0].addressLine1}, {owner.residences[0].block}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-2 text-gray-500">Owner information not available</p>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Entry Records</h3>
          <Tabs defaultValue="entries" className="mt-2 w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="entries">Recent Entries</TabsTrigger>
            </TabsList>
            <TabsContent value="entries" className="mt-4">
              {loadingEntries ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-md" />
                  ))}
                </div>
              ) : entries.length > 0 ? (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div key={entry.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Entry Time</p>
                          <p className="text-gray-900">{formatDate(entry.entryTime)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Exit Time</p>
                          <p className="text-gray-900">
                            {entry.exitTime ? formatDate(entry.exitTime) : "Not recorded"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No entry records found</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
