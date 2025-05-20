"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Car, Users, Mail, Phone, Home } from 'lucide-react'
import { VehiclesModal } from "./vehicles-modal"
import { GuestsModal } from "./guests-modal"

interface Residence {
  id: string
  addressLine1?: string
  block?: string
  residence?: string
  residenceType?: string
}

interface User {
  residentId: string
  firstname: string
  lastname: string
  email: string
  phone?: string
  cnic?: string
  residence: Residence
}

interface UserDetailsProps {
  user: User
}

export function UserDetails({ user }: UserDetailsProps) {
  const [showVehiclesModal, setShowVehiclesModal] = useState(false)
  const [showGuestsModal, setShowGuestsModal] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-brown-600">User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-gray-900">
                  {user.firstname} {user.lastname}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <div className="flex items-center text-gray-900">
                  <Mail className="mr-1 h-4 w-4 text-gray-400" />
                  {user.email}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <div className="flex items-center text-gray-900">
                  <Phone className="mr-1 h-4 w-4 text-gray-400" />
                  {user.phone || "Not provided"}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">CNIC</p>
                <p className="text-gray-900">{user.cnic || "Not provided"}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-gray-500">Residence Information</h3>
            <div className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <div className="flex items-center text-gray-900">
                        <Home className="mr-1 h-4 w-4 text-gray-400" />
                        {user.residence.addressLine1 || "Not provided"}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Block/Sector</p>
                      <p className="text-gray-900">{user.residence.block || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Residence</p>
                      <p className="text-gray-900">{user.residence.residence || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p className="text-gray-900">{user.residence.residenceType || "Not specified"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowVehiclesModal(true)}>
              <Car className="h-4 w-4" />
              View Vehicles
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowGuestsModal(true)}>
              <Users className="h-4 w-4" />
              View Guests
            </Button>
          </div>
        </CardContent>
      </Card>

      {showVehiclesModal && <VehiclesModal userId={user.residentId} onClose={() => setShowVehiclesModal(false)} />}

      {showGuestsModal && <GuestsModal userId={user.residentId} onClose={() => setShowGuestsModal(false)} />}
    </>
  )
}