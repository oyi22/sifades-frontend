import { Badge } from '@/components/ui/badge'

export default function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge
      variant="outline"
      className={`gap-1.5 font-normal text-[11px] ${
        isActive
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
          : 'bg-red-50 text-red-800 border-red-200'
      }`}
    >
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${
        isActive ? 'bg-emerald-500' : 'bg-red-500'
      }`} />
      {isActive ? 'Aktif' : 'Nonaktif'}
    </Badge>
  )
}