import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { UserCheck, ClipboardList } from 'lucide-react'

export default function RecentActivityCard({
  recentActivity,
  loadingAbsensi,
  loadingIzin
}: any) {
  return (
    <Card className="border-zinc-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-zinc-700">
          Aktivitas Terbaru
        </CardTitle>
      </CardHeader>

      <CardContent>
        {(loadingAbsensi || loadingIzin) ? (
          <div className="space-y-2">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        ) : recentActivity.length === 0 ? (
          <p className="text-sm text-zinc-400 py-6 text-center">
            Belum ada aktivitas hari ini
          </p>
        ) : (
          <div className="divide-y divide-zinc-100">
            {recentActivity.map((act: any) => (
              <div key={act.id} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-full ${
                    act.type === 'absensi' ? 'bg-emerald-50' : 'bg-amber-50'
                  }`}>
                    {act.type === 'absensi'
                      ? <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                      : <ClipboardList className="h-3.5 w-3.5 text-amber-600" />
                    }
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-800">{act.nama}</p>
                    <p className="text-[11px] text-zinc-400">{act.aksi}</p>
                  </div>
                </div>

                <span className="text-[11px] text-zinc-400">
                  {format(new Date(act.waktu), 'HH:mm', { locale: localeId })}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}