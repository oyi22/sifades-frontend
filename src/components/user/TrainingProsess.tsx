import { CheckCircle } from 'lucide-react'
import { POSES, TARGET } from '@/hooks/user/useUserTraining'

export default function TrainingProgress({ poses, poseIdx }: any) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {POSES.map((p, i) => {
        const count = poses[p.key] ?? 0
        const selesai = count >= TARGET
        const aktif = i === poseIdx

        return (
          <div
            key={p.key}
            className={`text-center p-2 rounded-lg border text-xs
              ${aktif ? 'border-primary bg-primary/5' :
                selesai ? 'border-emerald-200 bg-emerald-50' :
                'border-zinc-200'}`}
          >
            <div className="flex justify-center mb-1">
              {selesai ? (
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-zinc-400" />
              )}
            </div>

            <p className={`text-[11px] ${
              aktif ? 'text-primary' :
              selesai ? 'text-emerald-600' :
              'text-muted-foreground'
            }`}>
              {count}/{TARGET}
            </p>
          </div>
        )
      })}
    </div>
  )
}