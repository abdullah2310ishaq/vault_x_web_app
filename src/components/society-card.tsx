import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, MapPin, Star } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface SocietyCardProps {
  society: {
    societyId: string
    name: string
    address: string
    city?: string
    state?: string
    postalCode?: string
  }
  isLatest?: boolean
}

export function SocietyCard({ society, isLatest = false }: SocietyCardProps) {
  const { name, address, city, state, postalCode } = society

  const formattedLocation = [city, state, postalCode].filter(Boolean).join(", ")

  return (
    <Card className={`overflow-hidden ${isLatest ? 'ring-2 ring-brown-500' : ''}`}>
      <CardHeader className="bg-brown-50 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-start text-lg text-brown-600">
            <Building2 className="mr-2 h-5 w-5 flex-shrink-0" />
            <span>{name}</span>
          </CardTitle>
          {isLatest && (
            <Badge className="bg-brown-600 text-white">
              <Star className="mr-1 h-3 w-3" /> Latest
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex items-start text-sm">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
            <div>
              <p className="text-gray-700">{address}</p>
              {formattedLocation && <p className="text-gray-500">{formattedLocation}</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}