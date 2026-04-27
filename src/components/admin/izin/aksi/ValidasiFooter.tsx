import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function ValidasiFooter({
  isSetuju,
  catatan,
  setOpen,
  validasiMutasi
}: any) {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Batal
      </Button>

      <Button
        className={
          isSetuju
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-red-600 hover:bg-red-700'
        }
        disabled={
          (!isSetuju && !(catatan ?? '').trim()) ||
          validasiMutasi?.isPending
        }
        onClick={() => validasiMutasi?.mutate()}
      >
        {validasiMutasi?.isPending && (
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
        )}
        {isSetuju ? 'Ya, Setujui' : 'Ya, Tolak'}
      </Button>
    </DialogFooter>
  )
}