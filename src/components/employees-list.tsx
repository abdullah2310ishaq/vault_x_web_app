"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { User } from "lucide-react"

interface Employee {
  employeeId: string
  firstname: string
  lastname: string
  email: string
  phone?: string
  cnic?: string
  internalRole: string
  department?: string
  shift?: string
  joiningDate?: string
}

interface EmployeesListProps {
  employees: Employee[]
  selectedId: string | undefined
  onSelect: (employee: Employee) => void
}

export function EmployeesList({ employees, selectedId, onSelect }: EmployeesListProps) {
  if (employees.length === 0) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
        <p className="text-center text-gray-500">No employees found</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[500px] rounded-md border border-gray-200 bg-white">
      <div className="divide-y divide-gray-200">
        {employees.map((employee) => (
          <button
            key={employee.employeeId}
            className={`w-full cursor-pointer p-4 text-left transition-colors hover:bg-gray-50 ${
              selectedId === employee.employeeId ? "bg-brown-50" : ""
            }`}
            onClick={() => onSelect(employee)}
          >
            <div className="flex items-start">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {employee.firstname} {employee.lastname}
                </p>
                <p className="mt-1 text-sm text-gray-500">{employee.internalRole}</p>
                <p className="mt-1 text-xs text-gray-400">{employee.email}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
