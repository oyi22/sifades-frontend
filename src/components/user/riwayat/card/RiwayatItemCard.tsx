import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id as localeId } from 'date-fns/locale' 
import TipeIcon from './TipeIcon'
import StatusBadge from './StatusBadge'
import { TIPE_CONFIG, STATUS_CONFIG } from '@/components/user/riwayat/config'

export function RiwayatItemCard({ item, onHapus, loadingHapus }: any) {
  const tipeConf = TIPE_CONFIG[item.tipe as keyof typeof TIPE_CONFIG]
  const statusConf = item.status
  ? STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG]
  : null

  const waktu = formatDistanceToNow(new Date(item.terjadi_pada), {
    addSuffix: true,
    locale: localeId,
  })

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">

          <TipeIcon
            Icon={tipeConf.icon}
            color={tipeConf.color}
            bg={tipeConf.bg}
          />

          <div className="flex-1 min-w-0">

            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{item.judul}</p>
                {item.deskripsi && (
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {item.deskripsi}
                  </p>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                disabled={loadingHapus}
                onClick={() => onHapus(item.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <StatusBadge conf={statusConf} />

              <span className="text-xs text-muted-foreground ml-auto">
                {waktu}
              </span>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}