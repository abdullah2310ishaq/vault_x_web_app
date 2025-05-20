"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { User, Mail, Phone, Calendar, Briefcase, Clock } from "lucide-react"

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

interface EmployeeDetailsProps {
  employee: Employee
}

export function EmployeeDetails({ employee }: EmployeeDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-brown-600">Employee Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 text-brown-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {employee.firstname} {employee.lastname}
                </p>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Mail className="mr-1 h-4 w-4" />
                  {employee.email}
                </div>
                {employee.phone && (
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Phone className="mr-1 h-4 w-4" />
                    {employee.phone}
                  </div>
                )}
              </div>
            </div>

            {employee.cnic && (
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5" /> {/* Spacer for alignment */}
                <div>
                  <p className="text-sm font-medium text-gray-500">CNIC</p>
                  <p className="text-gray-900">{employee.cnic}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-gray-500">Employment Information</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-gray-900">{employee.internalRole}</p>
              </div>
            </div>

            {employee.department && (
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5" /> {/* Spacer for alignment */}
                <div>
                  <p className="text-sm font-medium text-gray-500">Department</p>
                  <p className="text-gray-900">{employee.department}</p>
                </div>
              </div>
            )}

            {employee.shift && (
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Shift</p>
                  <p className="text-gray-900">{employee.shift}</p>
                </div>
              </div>
            )}

            {employee.joiningDate && (
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Joining Date</p>
                  <p className="text-gray-900">{formatDate(employee.joiningDate, true)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
