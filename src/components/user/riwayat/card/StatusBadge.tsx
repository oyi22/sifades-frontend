import { Badge } from '@/components/ui/badge'

export default function StatusBadge({ config }: any) {
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className="text-xs px-1.5 py-0 gap-1">
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  )
}