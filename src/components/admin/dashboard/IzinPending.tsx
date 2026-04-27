import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, CheckCircle2, Clock } from 'lucide-react'

export default function IzinPendingCard({
  izinPendingList,
  loadingIzin,
  totalIzinPending,
  navigate
}: any) {
  return (
    <Card className="border-zinc-200 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-zinc-700 flex items-center gap-2">
            <Bell className="h-4 w-4 text-amber-500" />
            Pengajuan Izin
          </CardTitle>

          {totalIzinPending > 0 && (
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">
              {totalIzinPending} pending
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {loadingIzin ? (
          <div className="space-y-2">
            {[1,2,3].map(i => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}
          </div>
        ) : izinPendingList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-zinc-400">
            <CheckCircle2 className="h-8 w-8 mb-2 text-emerald-300" />
            <p className="text-sm">Tidak ada izin pending</p>
          </div>
        ) : (
          <div className="space-y-2">
            {izinPendingList.slice(0, 5).map((izin: any) => (
              <div key={izin.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                <div className="mt-0.5 p-1 rounded-full bg-amber-200">
                  <Clock className="h-3 w-3 text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-800 truncate">
                    {izin.user?.nama_lengkap ?? '-'}
                  </p>
                  <p className="text-[11px] text-zinc-500 capitalize">
                    Izin {izin.tipe} · {izin.durasi_hari} hari
                  </p>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 text-xs"
              onClick={() => navigate('/admin/izin')}
            >
              Kelola semua izin
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}