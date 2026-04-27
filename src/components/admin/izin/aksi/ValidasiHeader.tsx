import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { CheckCircle, XCircle } from 'lucide-react'

export default function ValidasiHeader({ isSetuju }: { isSetuju: boolean }) {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        {isSetuju ? (
          <>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            Setujui Izin
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4 text-red-600" />
            Tolak Izin
          </>
        )}
      </DialogTitle>

      <DialogDescription>
        {isSetuju
          ? 'Konfirmasi persetujuan izin pengguna ini'
          : 'Berikan alasan penolakan izin pengguna ini'}
      </DialogDescription>
    </DialogHeader>
  )
}