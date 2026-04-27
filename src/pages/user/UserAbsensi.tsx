import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUserAbsensi } from '@/hooks/user/useUserAbsensi'
import CameraPreview from '@/components/user/CameraPreviews'
import LocationInfo from '@/components/user/LocationInfo'
import CaptureButton from '@/components/user/CaptureButton'

export default function UserAbsensi() {
  const {
    videoRef,
    canvasRef,
    ready,
    capturing,
    lokasi,
    capture,
    isLoading,
    navigate,
  } = useUserAbsensi()

  return (
    <div className="max-w-xl mx-auto border-x border-border min-h-screen">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/user/dashboard')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-base font-semibold">Absensi Wajah</h1>
      </div> 
      
      <div className="px-4 py-4 space-y-5">

        <CameraPreview videoRef={videoRef} canvasRef={canvasRef} />

        <LocationInfo lokasi={lokasi} />

        <CaptureButton
          capture={capture}
          ready={ready}
          capturing={capturing}
          loading={isLoading}
        />

        <p className="text-xs text-center text-muted-foreground">
          Pastikan wajah Anda terlihat jelas di dalam bingkai
        </p>

      </div>
    </div>
  )
}