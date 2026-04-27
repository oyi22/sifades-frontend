import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle2, XCircle, BellRing } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

const TIPE_LABEL: Record<string, { label: string; color: string }> = {
  pengajuan: { label: 'Pengajuan', color: 'bg-blue-100 text-blue-700' },
  disetujui: { label: 'Disetujui', color: 'bg-emerald-100 text-emerald-700' },
  ditolak:   { label: 'Ditolak',   color: 'bg-red-100 text-red-700' },
  absensi:   { label: 'Absensi',   color: 'bg-zinc-100 text-zinc-600' },
}

export default function NotifDialog({
  open,
  setOpen,
  target,
  notifData,
  notifLoading,
}: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BellRing className="h-4 w-4 text-violet-600" />
            Riwayat Notifikasi WhatsApp
          </DialogTitle>
          <DialogDescription>
            Log pengiriman pesan sistem ke{' '}
            <span className="font-medium text-zinc-700">
              {target?.user?.nama_lengkap ?? '-'}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-1 max-h-[420px] overflow-y-auto space-y-3 pr-1">
          {notifLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-zinc-400 h-5 w-5" />
            </div>
          ) : !notifData || notifData.length === 0 ? (
            <p className="text-center text-sm text-zinc-400 py-10">
              Belum ada riwayat notifikasi untuk izin ini.
            </p>
          ) : (
            notifData.map((log: any) => {
              const meta = TIPE_LABEL[log.tipe] ?? { label: log.tipe, color: 'bg-zinc-100 text-zinc-600' }
              return (
                <div
                  key={log.id}
                  className="border border-zinc-200 rounded-lg p-3 space-y-2 bg-zinc-50"
                > 
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs px-2 py-0.5 ${meta.color}`}>
                      {meta.label}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                      {log.terkirim ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-red-400" />
                      )}
                      <span className={log.terkirim ? 'text-emerald-600' : 'text-red-500'}>
                        {log.terkirim ? 'Terkirim' : 'Gagal'}
                      </span>
                    </div>
                  </div>
 
                  <pre className="text-xs text-zinc-700 whitespace-pre-wrap leading-relaxed font-sans bg-white border border-zinc-100 rounded p-2">
                    {log.pesan}
                  </pre>
 
                  <p className="text-xs text-zinc-400 text-right">
                    {log.dikirim_pada
                      ? format(new Date(log.dikirim_pada), 'dd MMM yyyy · HH:mm', { locale: id })
                      : '—'}
                  </p>
                </div>
              )
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}