import {  CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useUserTraining, TARGET } from '@/hooks/user/useUserTraining'
import TrainingProgress from '@/components/user/TrainingProsess'
import TrainingCamera from '@/components/user/TrainingCamera'

export default function UserEnrollments() {
  const {
    videoRef,
    canvasRef,
    capturing,
    done,
    poses,
    poseIdx,
    currentPose,
    currentCount,
    allDone,
    startCapture,
    stopCapture,
    selesaiMutasi,
  } = useUserTraining()

  const progress = Math.min((currentCount / TARGET) * 100, 100)

  if (done) {
    return (
      <div className="max-w-xl mx-auto border-x border-border min-h-screen flex flex-col items-center justify-center gap-3 px-4">
        <CheckCircle className="h-12 w-12 text-black" />
        <p className="text-base font-semibold">Enrollment Selesai</p>
        <p className="text-sm text-muted-foreground">
          Mengarahkan ke Absensi...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto border-x border-border min-h-screen"> 
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-4 py-3">
        <h1 className="text-base font-semibold">Enrollment Wajah</h1>
      </div>
 
      <div className="px-4 py-4 space-y-5">

        <TrainingProgress poses={poses} poseIdx={poseIdx} />

        <TrainingCamera
          videoRef={videoRef}
          canvasRef={canvasRef}
          capturing={capturing}
          label={currentPose?.label}
        />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{currentPose?.label}</span>
            <span>{currentCount}/{TARGET}</span>
          </div>
          <Progress value={progress} />
        </div>

        {!allDone ? (
          <Button
            className={`w-full h-14 ${capturing ? 'bg-black/80' : 'bg-black'}`}
            onClick={capturing ? stopCapture : startCapture}
          >
            {capturing ? 'Menghentikan...' : 'Mulai Capture'}
          </Button>
        ) : (
          <Button
            className="w-full h-14 bg-black"
            onClick={() => selesaiMutasi.mutate()}
            disabled={selesaiMutasi.isPending}
          >
            {selesaiMutasi.isPending ? 'Memproses...' : 'Selesaikan Training'}
          </Button>
        )}

      </div>
    </div>
  )
}