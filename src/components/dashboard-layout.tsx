"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Building2, Users, Car, UserCheck, UserPlus, LogOut, Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="fixed left-4 top-4 z-50 block md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar for desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-40 hidden w-64 transform bg-brown-600 transition-transform duration-300 ease-in-out md:block ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent handleLogout={handleLogout} />
      </div>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="fixed inset-y-0 left-0 z-40 w-64 transform bg-brown-600 transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent handleLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ease-in-out md:ml-64`}>{children}</div>
    </div>
  )
}

function SidebarContent({ handleLogout }: { handleLogout: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-center space-x-2 p-6">
        <Building2 className="h-8 w-8 text-white" />
        <h1 className="text-2xl font-bold text-white">VaultX</h1>
      </div>

      <nav className="mt-6 flex-1 space-y-1 px-4">
        <SidebarLink
          href="/dashboard"
          icon={<Home className="h-5 w-5" />}
          text="Dashboard"
          isActive={pathname === "/dashboard"}
        />
        <SidebarLink
          href="/dashboard/society"
          icon={<Building2 className="h-5 w-5" />}
          text="Society"
          isActive={pathname === "/dashboard/society"}
        />
        <SidebarLink
          href="/dashboard/approvals"
          icon={<UserCheck className="h-5 w-5" />}
          text="Approvals"
          isActive={pathname === "/dashboard/approvals"}
        />
        <SidebarLink
          href="/dashboard/vehicles"
          icon={<Car className="h-5 w-5" />}
          text="Vehicles"
          isActive={pathname === "/dashboard/vehicles"}
        />
        <SidebarLink
          href="/dashboard/guests"
          icon={<UserPlus className="h-5 w-5" />}
          text="Guests"
          isActive={pathname === "/dashboard/guests"}
        />
        <SidebarLink
          href="/dashboard/employees"
          icon={<Users className="h-5 w-5" />}
          text="Employees"
          isActive={pathname === "/dashboard/employees"}
        />
        <SidebarLink
          href="/dashboard/users"
          icon={<Users className="h-5 w-5" />}
          text="Users"
          isActive={pathname === "/dashboard/users"}
        />
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-md px-4 py-2 text-white transition-colors hover:bg-brown-700"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

function SidebarLink({
  href,
  icon,
  text,
  isActive,
}: {
  href: string
  icon: React.ReactNode
  text: string
  isActive: boolean
}) {
  return (
    <a
      href={href}
      className={`flex items-center rounded-md px-4 py-2 text-white transition-colors hover:bg-brown-700 ${
        isActive ? "bg-brown-700" : ""
      }`}
    >
      <span className="mr-3">{icon}</span>
      {text}
    </a>
  )
}
