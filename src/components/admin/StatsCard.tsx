import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight } from 'lucide-react'

export default function StatsCard({
  icon: Icon,
  label,
  value,
  color,
  loading,
  to,
  navigate,
}: any) {
  return (
    <Card
      onClick={() => to && navigate && navigate(to)}
      className={`group relative overflow-hidden cursor-pointer border border-zinc-200 hover:shadow-md transition-all duration-200 ${to ? 'hover:-translate-y-0.5' : ''}`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
            {loading
              ? <Skeleton className="h-8 w-16 mt-1" />
              : <p className="text-3xl font-bold text-zinc-800">{value}</p>
            }
          </div>
          <div className={`p-2.5 rounded-xl ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {to && (
          <div className="mt-3 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors">
            <span>Lihat detail</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}