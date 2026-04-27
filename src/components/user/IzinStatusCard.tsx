import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'

export default function IzinStatusCard({ data }: any) {
  const statusStyle: Record<string, string> = {
    disetujui: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    ditolak:   'bg-red-50 text-red-700 border-red-200',
    menunggu:  'bg-amber-50 text-amber-700 border-amber-200',
  }

  const style = statusStyle[data.status] ?? statusStyle.menunggu

  return (
    <Card className={`border shadow-none ${style}`}>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <p className="text-sm font-semibold">Izin Sedang Diproses</p>
          </div>
          <Badge variant="outline" className={`text-xs capitalize border ${style}`}>
            {data.status}
          </Badge>
        </div>
        {data.catatan_admin && (
          <p className="text-xs opacity-80 italic border-t border-current/20 pt-2">
            Catatan admin: {data.catatan_admin}
          </p>
        )}
      </CardContent>
    </Card>
  )
}