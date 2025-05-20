"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { getToken } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Edit } from "lucide-react"
import { SocietyRegistrationForm } from "@/components/society-registration-form"

interface Society {
  societyId: string
  name: string
  address: string
  city?: string
  state?: string
  postalCode?: string
}

export default function SocietyPage() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [society, setSociety] = useState<Society | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchLatestSociety()
  }, [])

  const fetchLatestSociety = async () => {
    try {
      setLoading(true)
      const token = getToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/society/latest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 404) {
        // No society found, show registration form
        setShowRegistrationForm(true)
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch society")
      }

      const data = await response.json()
      if (data) {
        setSociety(data)
        setShowRegistrationForm(false)
      } else {
        setShowRegistrationForm(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching society")
      setShowRegistrationForm(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSocietyCreated = () => {
    fetchLatestSociety()
  }

  const formatAddress = (society: Society) => {
    const addressParts = [society.address]

    if (society.city || society.state) {
      const cityState = [society.city, society.state].filter(Boolean).join(", ")
      addressParts.push(cityState)
    }

    if (society.postalCode) {
      addressParts.push(society.postalCode)
    }

    return addressParts.join(", ")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-4">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brown-600 border-t-transparent"></div>
            </div>
          ) : showRegistrationForm ? (
            <SocietyRegistrationForm
              onSocietyCreated={handleSocietyCreated}
              onCancel={() => setShowRegistrationForm(false)}
            />
          ) : society ? (
            <div className="relative rounded-lg bg-gradient-to-r from-brown-100 to-brown-50 p-8 shadow-md">
              <div className="absolute right-4 top-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white px-4 text-brown-600 hover:bg-brown-50"
                  onClick={() => setShowRegistrationForm(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  EDIT
                </Button>
              </div>

              <div className="mx-auto max-w-3xl text-center">
                <h1 className="mb-6 text-4xl font-bold text-brown-800">{society.name}</h1>
                <p className="text-lg text-brown-600">{formatAddress(society)}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
              <p className="mb-4 text-gray-500">No society registered yet</p>
              <Button onClick={() => setShowRegistrationForm(true)} className="bg-brown-600 hover:bg-brown-700">
                REGISTER SOCIETY
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
