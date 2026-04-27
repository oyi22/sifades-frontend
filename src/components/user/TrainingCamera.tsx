import { Card, CardContent } from '@/components/ui/card'

export default function TrainingCamera({ videoRef, canvasRef, capturing, label }: any) {
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

        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-52 h-64 border-2 rounded-2xl transition-colors ${
            capturing ? 'border-emerald-400' : 'border-white/60'
          }`} />
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/60 text-white text-sm px-4 py-2 rounded-full">
            {label}
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  )
}