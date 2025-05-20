"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { User } from 'lucide-react'

interface Residence {
  id: string
  addressLine1?: string
  block?: string
  residence?: string
  residenceType?: string
}

interface UserData {
  residentId: string
  firstname: string
  lastname: string
  email: string
  phone?: string
  cnic?: string
  residence: Residence
}

interface UsersListProps {
  users: UserData[]
  selectedId: string | undefined
  onSelect: (user: UserData) => void
}

export function UsersList({ users, selectedId, onSelect }: UsersListProps) {
  if (users.length === 0) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
        <p className="text-center text-gray-500">No approved users found</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[500px] rounded-md border border-gray-200 bg-white">
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <button
            key={user.residentId}
            className={`w-full cursor-pointer p-4 text-left transition-colors hover:bg-gray-50 ${
              selectedId === user.residentId ? "bg-brown-50" : ""
            }`}
            onClick={() => onSelect(user)}
          >
            <div className="flex items-start">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user.firstname} {user.lastname}
                </p>
                <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {user.residence.addressLine1 || user.residence.block || "No address provided"}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}