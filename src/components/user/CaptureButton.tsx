import { Button } from '@/components/ui/button'
import { Camera, Loader2 } from 'lucide-react'

export default function CaptureButton({
  capture,
  ready,
  capturing,
  loading,
}: any) {
  return (
    <Button
      className="w-full h-14 text-base"
      onClick={capture}
      disabled={!ready || capturing || loading}
    >
      {(capturing || loading) ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          Memproses...
        </>
      ) : (
        <>
          <Camera className="h-5 w-5 mr-2" />
          Ambil & Absen
        </>
      )}
    </Button>
  )
}