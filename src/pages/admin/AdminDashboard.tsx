import { format } from 'date-fns'  
import { id as localeId } from 'date-fns/locale'
import { Users, ShieldCheck, UserCheck, ClipboardList } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StatsCard from '@/components/admin/StatsCard'
import PageHeader from '@/components/shared/PageHeader'
import Core from '@/components/admin/dashboard/Core'
import { useAdminDashboard } from '@/hooks/admin/useAdminDashboard'
import type { Activity } from '@/types/dashboard'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const today = format(new Date(), "EEEE, dd MMMM yyyy", { locale: localeId })

  const {
    usersQuery,
    akunQuery,
    absensiQuery,
    rekapQuery,
    izinQuery,
    absensiList,
    izinPendingList,
    totalKaryawan,
    totalAkun,
    hadirHariIni,
    totalIzinPending,
    rekapList,
  } = useAdminDashboard()


  const chartData = (rekapList || []).map((item: any) => ({
    hari: item.tanggal,
    Hadir: item.hadir ?? 0,
    Alpha: item.alpha ?? 0,
    Izin: item.izin ?? 0,
  }))

  const recentActivity: Activity[] = [
    ...absensiList.slice(0, 5).map((a: any) => ({
      id: `absensi-${a.id}`,
      nama: a.user?.nama_lengkap ?? '-',
      aksi: a.status === 'hadir'
        ? 'Scan masuk'
        : a.status === 'terlambat'
        ? 'Scan masuk (terlambat)'
        : 'Absensi',
      waktu: a.waktu_masuk ?? a.created_at,
      type: 'absensi' as const, 
    })),
    ...izinPendingList.slice(0, 5).map((z: any) => ({
      id: `izin-${z.id}`,
      nama: z.user?.nama_lengkap ?? '-',
      aksi: `Ajukan izin ${z.tipe}`,
      waktu: z.created_at,
      type: 'izin' as const,  
    })),
  ]
    .filter(x => x.waktu)
    .sort((a, b) => new Date(b.waktu).getTime() - new Date(a.waktu).getTime())
    .slice(0, 8)

  return (
    <div className="space-y-6 pb-8">
      <PageHeader title="Dashboard" subtitle={today} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Users} label="Total Karyawan" value={totalKaryawan} loading={usersQuery.isLoading} navigate={navigate} />
        <StatsCard icon={ShieldCheck} label="Total Akun" value={totalAkun} loading={akunQuery.isLoading} navigate={navigate} />
        <StatsCard icon={UserCheck} label="Hadir Hari Ini" value={hadirHariIni} loading={absensiQuery.isLoading} navigate={navigate} />
        <StatsCard icon={ClipboardList} label="Izin Pending" value={totalIzinPending} loading={izinQuery.isLoading} navigate={navigate} />
      </div>

      <Core
        chartData={chartData}
        loadingRekap={rekapQuery.isLoading}
        izinPendingList={izinPendingList}
        loadingIzin={izinQuery.isLoading}
        totalIzinPending={totalIzinPending}
        navigate={navigate}
        recentActivity={recentActivity}
        loadingAbsensi={absensiQuery.isLoading}
      />
    </div>
  )
}