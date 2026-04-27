import { useRef } from 'react'
import { Camera, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAdminFotoProfile } from '@/hooks/admin/useAdminFotoProfile'

interface AvatarUploadProps {
  userId: number
  currentFotoUrl?: string | null
  namaLengkap?: string
}

export default function AvatarUpload({ userId, currentFotoUrl, namaLengkap }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { preview, handleFileChange, deleteMutation, isUploading, isDeleting } =
    useAdminFotoProfile(userId)

  const displayUrl = preview ?? currentFotoUrl ?? null
  const initials = namaLengkap
    ? namaLengkap.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group">
        <Avatar className="h-24 w-24 ring-2 ring-border">
          <AvatarImage src={displayUrl ?? undefined} alt={namaLengkap} />
          <AvatarFallback className="text-lg font-semibold bg-muted">
            {initials}
          </AvatarFallback>
        </Avatar>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isUploading
            ? <Loader2 className="h-5 w-5 text-white animate-spin" />
            : <Camera className="h-5 w-5 text-white" />
          }
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpg,image/jpeg,image/png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileChange(file)
          e.target.value = ''
        }}
      />

      {displayUrl && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive gap-1.5"
          onClick={() => deleteMutation.mutate()}
          disabled={isDeleting}
        >
          {isDeleting
            ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
            : <Trash2 className="h-3.5 w-3.5" />
          }
          Hapus Foto
        </Button>
      )}
    </div>
  )
}