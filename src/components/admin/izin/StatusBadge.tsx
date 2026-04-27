import { Badge } from '@/components/ui/badge'

export default function StatusBadge({ status }: { status: string }) {
  if (status === 'disetujui')
    return <Badge className="bg-emerald-100 text-emerald-700">Disetujui</Badge>

  if (status === 'ditolak')
    return <Badge variant="destructive">Ditolak</Badge>

  return <Badge variant="secondary">Pending</Badge>
}