import { cn } from '@/lib/utils'

export default function TipeIcon({ Icon, color, bg }: any) {
  return (
    <div className={cn('p-2 rounded-lg shrink-0 mt-0.5', bg)}>
      <Icon className={cn('w-4 h-4', color)} />
    </div>
  )
}