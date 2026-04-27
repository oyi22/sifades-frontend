import { MapPin } from 'lucide-react'

export default function LocationInfo({ lokasi }: any) {
  if (!lokasi) return null

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <MapPin className="h-4 w-4 text-emerald-500" />
      <span>{lokasi.nama}</span>
    </div>
  )
}