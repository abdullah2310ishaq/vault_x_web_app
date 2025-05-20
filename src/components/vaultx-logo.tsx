import { Building2 } from "lucide-react"

export function VaultXLogo({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center rounded-full bg-brown-600 p-2 text-white`}>
      <Building2 className="h-full w-full" />
    </div>
  )
}
