import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Trash2, History } from 'lucide-react'

export default function IzinActions({
  item,
  openValidasi,
  openPerpanjang,
  openNotif,
  setTargetHapus
}: any) {
  return (
    <div className="flex justify-end gap-1">
      {item.status === 'pending' && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
            onClick={() => openValidasi(item, 'disetujui')}
          >
            <CheckCircle className="mr-1 h-4 w-4" /> Setuju
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-50"
            onClick={() => openValidasi(item, 'ditolak')}
          >
            <XCircle className="mr-1 h-4 w-4" /> Tolak
          </Button>
        </>
      )}

      {item.tipe === 'sakit' && item.status === 'disetujui' && !item.sudah_diperpanjang && (
        <Button
          size="sm"
          variant="outline"
          className="text-blue-600 border-blue-300 hover:bg-blue-50"
          onClick={() => openPerpanjang(item)}
        >
          Perpanjang
        </Button>
      )}
 
      <Button
        size="sm"
        variant="ghost"
        className="text-zinc-400 hover:text-violet-600"
        onClick={() => openNotif(item)}
      >
        <History className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className="text-zinc-400 hover:text-red-600"
        onClick={() => setTargetHapus(item)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}