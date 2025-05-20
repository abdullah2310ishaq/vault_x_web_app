"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { EmployeesList } from "@/components/employees-list"
import { EmployeeDetails } from "@/components/employee-details"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Plus, Search } from "lucide-react"
import { getToken } from "@/lib/auth"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AddEmployeeModal } from "@/components/add-employee-modal"

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

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEmployees(employees)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = employees.filter(
        (employee) =>
          employee.firstname.toLowerCase().includes(query) ||
          employee.lastname.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.internalRole.toLowerCase().includes(query) ||
          (employee.department && employee.department.toLowerCase().includes(query)),
      )
      setFilteredEmployees(filtered)
    }
  }, [searchQuery, employees])

  const fetchEmployees = async () => {
    setLoading(true)
    try {
      const token = getToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch employees")
      }

      const data = await response.json()
      setEmployees(data)
      setFilteredEmployees(data)
      if (data.length > 0) {
        setSelectedEmployee(null) // Don't auto-select, let user click
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching employees")
    } finally {
      setLoading(false)
    }
  }

  const handleAddEmployee = async (employeeData: any) => {
    try {
      const token = getToken()
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create employee")
      }

      // Refresh the employee list
      await fetchEmployees()
      setShowAddModal(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while creating employee")
      return false
    }
    return true
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-brown-600">Employees</h1>
            <p className="mt-2 text-gray-400">Manage society employees</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-brown-600 hover:bg-brown-700">
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search employees by name, email, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
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
              <EmployeesList
                employees={filteredEmployees}
                selectedId={selectedEmployee?.employeeId}
                onSelect={setSelectedEmployee}
              />
            )}
          </div>
          <div className="lg:col-span-2">
            {loading ? (
              <Skeleton className="h-[500px] w-full rounded-md" />
            ) : selectedEmployee ? (
              <EmployeeDetails employee={selectedEmployee} />
            ) : (
              <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-6">
                <p className="text-center text-gray-500">
                  {filteredEmployees.length === 0 ? "No employees found" : "Select an employee to view details"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddModal && <AddEmployeeModal onClose={() => setShowAddModal(false)} onSubmit={handleAddEmployee} />}
    </DashboardLayout>
  )
}
