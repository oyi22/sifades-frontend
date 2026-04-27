import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Power, RefreshCcw, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

export default function AkunActions({ a, toggleMutasi, resetMutasi, deleteMutasi }: any) {
  const [openHapus, setOpenHapus] = useState(false)

  return (
    <>
      <div className="flex justify-end">
        <TooltipProvider delayDuration={150}>
          <div className="inline-flex items-center divide-x divide-border border border-border rounded-md overflow-hidden">

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-7 rounded-none hover:bg-red-50 hover:text-red-600"
                  onClick={() => toggleMutasi.mutate(a.id)}
                >
                  <Power className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {a.is_active ? 'Nonaktifkan' : 'Aktifkan'}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-7 rounded-none"
                  onClick={() => resetMutasi.mutate(a.id)}
                  disabled={resetMutasi.isPending}
                >
                  {resetMutasi.isPending
                    ? <Loader2 className="w-3 h-3 animate-spin" />
                    : <RefreshCcw className="w-3 h-3" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">Reset password</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-7 rounded-none hover:bg-red-50 hover:text-red-600"
                  onClick={() => setOpenHapus(true)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">Hapus</TooltipContent>
            </Tooltip>

          </div>
        </TooltipProvider>
      </div>

      <AlertDialog open={openHapus} onOpenChange={setOpenHapus}>
        <AlertDialogContent className="max-w-[380px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus akun ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Akun <span className="font-medium text-foreground">{a.user?.nama_lengkap ?? a.username}</span> akan dihapus permanen dan tidak bisa dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8 text-sm">Batal</AlertDialogCancel>
            <AlertDialogAction
              className="h-8 text-sm bg-red-600 hover:bg-red-700 text-white"
              onClick={() => deleteMutasi.mutate(a.id)}
            >
              {deleteMutasi.isPending
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : 'Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}