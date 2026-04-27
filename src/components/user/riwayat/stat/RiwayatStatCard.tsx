import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function RiwayatStatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  bgClass,
  active,
  onClick
}: any) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-md select-none',
        active && 'ring-2 ring-offset-1',
        active && colorClass.replace('text-', 'ring-')
      )}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className={cn('p-2 rounded-lg', bgClass)}>
          <Icon className={cn('w-5 h-5', colorClass)} />
        </div>

        <div>
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl font-bold leading-none mt-0.5">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}