import { DashboardLayout } from "@/components/dashboard-layout"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-brown-600">Dashboard</h1>
        <p className="mt-2 text-gray-400">Welcome to the VaultX Society Management System</p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Resident Approvals"
            description="Pending resident approvals"
            href="/dashboard/approvals"
          />

          <DashboardCard title="Guests" description="Guests registered today" href="/dashboard/guests" />
          <DashboardCard title="Employees" description="Manage society employees" href="/dashboard/employees" />
          <DashboardCard title="Users" description="Approved residents" href="/dashboard/users" />
        </div>
      </div>
    </DashboardLayout>
  )
}

function DashboardCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <h2 className="text-xl font-semibold text-brown-600">{title}</h2>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </a>
  )
}
