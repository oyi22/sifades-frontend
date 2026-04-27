import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend, CartesianGrid
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { TrendingUp, ArrowRight } from 'lucide-react'
import ChartTooltip from './ChartTooltip'

export default function KehadiranChart({ chartData, loadingRekap, navigate }: any) {
  return (
    <Card className="lg:col-span-2 border-zinc-200 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-zinc-700 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Kehadiran 7 Hari Terakhir
          </CardTitle>

          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-zinc-400 hover:text-zinc-700 h-7 px-2"
            onClick={() => navigate('/admin/absensi')}
          >
            Lihat semua <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {loadingRekap ? (
          <Skeleton className="h-52 w-full rounded-lg" />
        ) : (
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={chartData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="hari" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Bar dataKey="Hadir" fill="#34d399" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Alpha" fill="#f87171" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Izin" fill="#fbbf24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}