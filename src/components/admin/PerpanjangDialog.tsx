import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CalendarClock } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export default function PerpanjangDialog({
  open,
  setOpen,
  target,
  tanggal,
  setTanggal,
  mutasi
}: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-blue-600" />
            Perpanjang Izin Sakit
          </DialogTitle>
          <DialogDescription>
            Tentukan tanggal selesai baru untuk izin sakit pengguna ini
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-lg space-y-1">
            <p className="font-semibold text-zinc-800">{target?.user?.nama_lengkap}</p>
            <p className="text-sm text-zinc-500 capitalize">
              Tipe: <span className="font-medium text-zinc-700">{target?.tipe}</span>
            </p>
            {target?.tanggal_mulai && (
              <p className="text-sm text-zinc-500">
                Periode saat ini:{' '}
                <span className="font-medium text-zinc-700">
                  {format(new Date(target.tanggal_mulai), 'dd MMM yyyy', { locale: id })}
                  {' – '}
                  {format(new Date(target.tanggal_selesai), 'dd MMM yyyy', { locale: id })}
                </span>
              </p>
            )}
            <p className="text-sm text-zinc-500">
              Durasi saat ini:{' '}
              <span className="font-medium text-zinc-700">{target?.durasi_hari} hari</span>
            </p>
          </div>

          <div className="space-y-1">
            <Label>
              Tanggal Selesai Baru <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={tanggal}
              min={target?.tanggal_selesai
                ? format(new Date(new Date(target.tanggal_selesai).getTime() + 86400000), 'yyyy-MM-dd')
                : undefined
              }
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!tanggal.trim() || mutasi?.isPending}
            onClick={() => mutasi?.mutate()}
          >
            {mutasi?.isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            Perpanjang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}