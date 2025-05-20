"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AddEmployeeModalProps {
  onClose: () => void
  onSubmit: (data: any) => Promise<boolean>
}

export function AddEmployeeModal({ onClose, onSubmit }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState({
    // User fields
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    cnic: "",
    // Employee fields
    internalRole: "",
    department: "",
    shift: "",
    joiningDate: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generalError, setGeneralError] = useState("")
  const [activeTab, setActiveTab] = useState("personal")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields
    if (!formData.firstname) newErrors.firstname = "First name is required"
    if (!formData.lastname) newErrors.lastname = "Last name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password && formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (!formData.internalRole) newErrors.internalRole = "Role is required"

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) newErrors.email = "Invalid email format"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError("")

    if (!validateForm()) {
      // If there are validation errors, switch to the appropriate tab
      const personalFieldErrors = ["firstname", "lastname", "email", "password", "phone", "cnic"]
      const hasPersonalErrors = personalFieldErrors.some((field) => errors[field])
      setActiveTab(hasPersonalErrors ? "personal" : "employment")
      return
    }

    setIsSubmitting(true)
    try {
      const success = await onSubmit(formData)
      if (success) {
        onClose()
      }
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-brown-600">Add New Employee</DialogTitle>
          <DialogDescription>Create a new employee account with login credentials.</DialogDescription>
        </DialogHeader>

        {generalError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="employment">Employment Details</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className={errors.firstname ? "border-red-500" : ""}
                  />
                  {errors.firstname && <p className="text-xs text-red-500">{errors.firstname}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastname">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={errors.lastname ? "border-red-500" : ""}
                  />
                  {errors.lastname && <p className="text-xs text-red-500">{errors.lastname}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC</Label>
                <Input id="cnic" name="cnic" value={formData.cnic} onChange={handleChange} />
              </div>
            </TabsContent>

            <TabsContent value="employment" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="internalRole">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="internalRole"
                  name="internalRole"
                  value={formData.internalRole}
                  onChange={handleChange}
                  placeholder="e.g., Security Guard, Maintenance Staff"
                  className={errors.internalRole ? "border-red-500" : ""}
                />
                {errors.internalRole && <p className="text-xs text-red-500">{errors.internalRole}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g., Security, Maintenance, Administration"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shift">Shift</Label>
                <Input
                  id="shift"
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  placeholder="e.g., Morning, Evening, Night"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input
                  id="joiningDate"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleChange}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-brown-600 hover:bg-brown-700" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
