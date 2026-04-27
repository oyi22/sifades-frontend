import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { FileText } from 'lucide-react'
import StatusBadge from './StatusBadge'

const TIPE_LABEL: Record<string, string> = {
  dinas: 'Izin Dinas',
  sakit: 'Izin Sakit',
  lainnya: 'Izin Lainnya',
}

export default function IzinHistoryItem({ item }: any) {
  return (
    <Card className="border-zinc-200">
      <CardContent className="p-4">
        <div className="flex justify-between gap-2">

          <div className="flex-1">
 
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">
                {format(new Date(item.tanggal_mulai), 'dd MMM', { locale: id })}
                {' – '}
                {format(new Date(item.tanggal_selesai), 'dd MMM yyyy', { locale: id })}
              </p>
              <span className="text-xs text-muted-foreground">
                ({item.durasi_hari} hari)
              </span>
            </div>
 
            <p className="text-xs text-blue-600 font-medium mt-0.5">
              {TIPE_LABEL[item.tipe]}
              {item.sudah_diperpanjang && (
                <span className="ml-1 text-amber-600">(Diperpanjang)</span>
              )}
            </p>
 
            {item.alasan && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {item.alasan}
              </p>
            )}
 
            {item.file_surat && (
              <a
                href={`/storage/${item.file_surat}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-500 mt-1 hover:underline"
              >
                <FileText className="h-3 w-3" />
                Lihat Surat
              </a>
            )}
 
            {item.catatan_admin && (
              <p className="text-xs text-muted-foreground mt-1 italic">
                Admin: {item.catatan_admin}
              </p>
            )}

          </div> 

          <StatusBadge status={item.status} />

        </div>
      </CardContent>
    </Card>
  )
}