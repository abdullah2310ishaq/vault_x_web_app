"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Search } from 'lucide-react'
import { getToken } from "@/lib/auth"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { UserDetails } from "@/components/user-details"
import { UsersList } from "@/components/users-list"

interface Residence {
  id: string
  addressLine1?: string
  block?: string
  residence?: string
  residenceType?: string
}

interface User {
  residentId: string  // Note: Changed from userid to residentId to match backend
  firstname: string
  lastname: string
  email: string
  phone?: string
  cnic?: string
  residence: Residence  // Note: Changed from residences array to single residence object
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchApprovedUsers()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = users.filter(
        (user) =>
          user.firstname.toLowerCase().includes(query) ||
          user.lastname.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          (user.cnic && user.cnic.toLowerCase().includes(query)) ||
          (user.residence.addressLine1 && user.residence.addressLine1.toLowerCase().includes(query))
      )
      setFilteredUsers(filtered)
    }
  }, [searchQuery, users])

  const fetchApprovedUsers = async () => {
    setLoading(true)
    try {
      const token = getToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/approval/approved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch approved users")
      }

      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
      if (data.length > 0) {
        setSelectedUser(null) // Don't auto-select, let user click
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching users")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-brown-600">Approved Users</h1>
        <p className="mt-2 text-gray-400">View and manage approved residents</p>

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
              placeholder="Search users by name, email, CNIC, or address..."
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
                <UsersList users={filteredUsers} selectedId={selectedUser?.residentId} onSelect={setSelectedUser} />
              )}
            </div>
            <div className="lg:col-span-2">
              {loading ? (
                <Skeleton className="h-[500px] w-full rounded-md" />
              ) : selectedUser ? (
                <UserDetails user={selectedUser} />
              ) : (
                <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
                  <p className="text-center text-gray-500">
                    {filteredUsers.length === 0 ? "No approved users found" : "Select a user to view details"}
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