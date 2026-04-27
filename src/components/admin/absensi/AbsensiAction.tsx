import { Button } from '@/components/ui/button'
import { Loader2, Power, RefreshCcw, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent,  TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function AbsensiActions({
  a,
  toggleMutasi,
  resetMutasi,
  deleteMutasi
}: any) {
  return (
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
            <TooltipContent side="top" className="text-xs">Nonaktifkan</TooltipContent>
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
                onClick={() => { if (confirm('Yakin hapus akun?')) deleteMutasi.mutate(a.id) }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">Hapus</TooltipContent>
          </Tooltip>

        </div>
      </TooltipProvider>
    </div>
  )
}