import { useRef } from 'react'
import { Camera, Trash2, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useUserFotoProfile } from '@/hooks/user/useUserFotoProfile'

interface ProfileAvatarProps {
  currentFotoUrl?: string | null
  namaLengkap?: string
}

export default function ProfileAvatar({ currentFotoUrl, namaLengkap }: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { preview, handleFileChange, deleteMutation, isUploading, isDeleting } =
    useUserFotoProfile()

  const displayUrl = preview ?? currentFotoUrl ?? null
  const initials = namaLengkap
    ? namaLengkap.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <div className="flex flex-col items-center text-center gap-3">
       
      <div
        className="relative group cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <Avatar className="h-20 w-20 ring-1 ring-border">
          <AvatarImage src={displayUrl ?? undefined} alt={namaLengkap} />
          <AvatarFallback className="text-lg font-semibold bg-muted">
            {initials}
          </AvatarFallback>
        </Avatar>
 
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition">
          {isUploading ? (
            <Loader2 className="h-5 w-5 text-white animate-spin" />
          ) : (
            <Camera className="h-5 w-5 text-white" />
          )}
        </div>
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
          className="text-xs text-muted-foreground hover:text-foreground px-2"
          onClick={() => deleteMutation.mutate()}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Trash2 className="h-3 w-3" />
          )}
          Hapus foto
        </Button>
      )}
    </div>
  )
}