import { Card, CardContent } from '@/components/ui/card'

export default function CameraPreview({ videoRef, canvasRef }: any) {
  return (
    <Card className="border-zinc-200 overflow-hidden">
      <CardContent className="p-0 relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full aspect-[4/3] object-cover bg-zinc-900 scale-x-[-1]" // kalau ngak pakai leptop cilangin biar ngak miror
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-52 h-64 border-2 border-white/60 rounded-2xl shadow-lg" />
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  )
}