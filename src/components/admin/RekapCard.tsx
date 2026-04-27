import { Card, CardContent } from '@/components/ui/card'

export default function RekapCard({ rekapData }: any) {
  if (!rekapData) return null

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { label: 'Hadir', value: rekapData.hadir, color: 'text-emerald-600' },
        { label: 'Izin', value: rekapData.izin, color: 'text-amber-600' },
        { label: 'Alpha', value: rekapData.alpha, color: 'text-red-600' },
      ].map((r) => (
        <Card key={r.label} className="border-zinc-200">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{r.label}</p>
            <p className={`text-2xl font-bold mt-1 ${r.color}`}>
              {r.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}