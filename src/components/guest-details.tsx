"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { Car, Home, Phone, Calendar, CheckCircle, User } from "lucide-react"

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

interface GuestDetailsProps {
  guest: Guest
}

export function GuestDetails({ guest }: GuestDetailsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-brown-600">Guest Details</CardTitle>
        <Badge
          variant="outline"
          className={`${guest.visitCompleted ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}
        >
          {guest.visitCompleted ? "Verified" : "Pending"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Guest Information</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{guest.guestName}</p>
                {guest.guestPhoneNumber && (
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Phone className="mr-1 h-4 w-4" />
                    {guest.guestPhoneNumber}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Expected Time of Arrival</p>
                <p className="text-gray-900">{formatDate(guest.eta)}</p>
              </div>
            </div>

            {guest.visitCompleted && (
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Verification Status</p>
                  <p className="text-green-600">Verified and Completed</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Residence Information</h3>
          {guest.residence ? (
            <div className="mt-4 flex items-center">
              <Home className="mr-2 h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-gray-900">
                  {guest.residence.addressLine1}, {guest.residence.block}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-gray-500">No residence information available</p>
          )}
        </div>

        {guest.guestVehicle && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Vehicle Information</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Car className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vehicle Details</p>
                    <p className="text-gray-900">
                      {guest.guestVehicle.vehicleModel || "Unknown Model"}{" "}
                      {guest.guestVehicle.vehicleColor && `(${guest.guestVehicle.vehicleColor})`}
                    </p>
                  </div>
                </div>

                {guest.guestVehicle.vehicleLicensePlateNumber && (
                  <div className="flex items-center">
                    <div className="mr-2 h-5 w-5" /> {/* Spacer for alignment */}
                    <div>
                      <p className="text-sm font-medium text-gray-500">License Plate</p>
                      <p className="text-gray-900">{guest.guestVehicle.vehicleLicensePlateNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
