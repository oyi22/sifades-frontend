import { AlertDialog, AlertDialogAction,  AlertDialogCancel,  AlertDialogContent, AlertDialogDescription,  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-react'

export default function DeleteIzinDialog({
  targetHapus,
  setTargetHapus,
  hapusMutasi
}: any) {
  return (
    <AlertDialog open={!!targetHapus} onOpenChange={(v) => !v && setTargetHapus(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data Izin?</AlertDialogTitle>
          <AlertDialogDescription>
            Data izin milik{' '}
            <span className="font-semibold text-zinc-800">
              {targetHapus?.user?.nama_lengkap}
            </span>{' '}
            akan dihapus permanen dan tidak bisa dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={() => {
              hapusMutasi.mutate(targetHapus.id)
              setTargetHapus(null)
            }}
          >
            {hapusMutasi.isPending ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              'Ya, Hapus'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}