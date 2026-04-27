import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { MessageSquareText, FileText } from 'lucide-react'

export default function AlasanPopover({ 
  alasan, 
  fileSurat 
}: { 
  alasan?: string | null
  fileSurat?: string | null 
}) {
  const fileUrl = fileSurat
    ? `http://localhost:8000/storage/${fileSurat}`
    : null
 
  if (!alasan && !fileUrl) return <span>-</span> 
  if (!alasan && fileUrl) {
    return (
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-blue-600 gap-1.5">
          <FileText className="h-4 w-4" />
          <span className="text-xs">Lihat Surat</span>
        </Button>
      </a>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-blue-600 gap-1.5">
          <MessageSquareText className="h-4 w-4" />
          <span className="text-xs">Lihat</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 text-sm text-zinc-700 leading-relaxed">
        <p className="font-semibold text-zinc-900 mb-1">Alasan Izin</p>
        <p className="mb-3">{alasan}</p>

        {fileUrl && (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="w-full gap-2 text-blue-600 border-blue-200 hover:bg-blue-50">
              <FileText className="h-4 w-4" />
              Lihat Surat Lampiran
            </Button>
          </a>
        )}
      </PopoverContent>
    </Popover>
  )
}