import { useQuery } from '@tanstack/react-query'
import { format, subDays } from 'date-fns'
import api from '@/api/axios'

const fetchUsers = () => api.get('/admin/users').then(r => r.data)
const fetchAkun = () => api.get('/admin/akun').then(r => r.data)
const fetchAbsensiHariIni = () =>
  api.get('/admin/absensi', { params: { tanggal: format(new Date(), 'yyyy-MM-dd') } }).then(r => r.data)
const fetchRekap7Hari = () =>
  api.get('/admin/absensi/rekap', {
    params: {
      dari: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
      sampai: format(new Date(), 'yyyy-MM-dd'),
    }
  }).then(r => r.data)
const fetchIzinPending = () =>
  api.get('/admin/izin', { params: { status: 'pending' } }).then(r => r.data)

function parseTotal(data: any, fallback = 0): number {
  return (
    data?.total ??
    data?.data?.total ??
    data?.meta?.total ??
    data?.data?.meta?.total ??
    (Array.isArray(data?.data?.data) ? data.data.data.length : null) ??
    (Array.isArray(data?.data) ? data.data.length : null) ??
    fallback
  )
}

function parseList(data: any): any[] {
  if (Array.isArray(data?.data?.data)) return data.data.data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data)) return data
  return []
}

export function useAdminDashboard() {
  const usersQuery = useQuery({ 
    queryKey: ['dash-users'], 
    queryFn: fetchUsers, 
    staleTime: 60000 
  })

  const akunQuery = useQuery({ 
    queryKey: ['dash-akun'], 
    queryFn: fetchAkun, 
    staleTime: 60000,
    enabled: usersQuery.isSuccess,
  })

  const absensiQuery = useQuery({ 
    queryKey: ['dash-absensi'], 
    queryFn: fetchAbsensiHariIni, 
    staleTime: 30000 
  })

  const rekapQuery = useQuery({ 
    queryKey: ['dash-rekap'], 
    queryFn: fetchRekap7Hari, 
    staleTime: 60000,
    enabled: usersQuery.isSuccess,
  })

  const izinQuery = useQuery({ 
    queryKey: ['dash-izin'], 
    queryFn: fetchIzinPending, 
    staleTime: 30000,
     enabled: usersQuery.isSuccess,
  })

  const absensiList = parseList(absensiQuery.data)
  const izinPendingList = parseList(izinQuery.data)

  const totalKaryawan = parseTotal(usersQuery.data)
  const totalAkun = parseTotal(akunQuery.data)

  const hadirHariIni = absensiList.filter((a: any) =>
    a.status === 'hadir' || a.status === 'terlambat'
  ).length

  const totalIzinPending = izinPendingList.length || parseTotal(izinQuery.data)
  const rekapList = parseList(rekapQuery.data)

  return {
    usersQuery,
    akunQuery,
    absensiQuery,
    rekapQuery,
    izinQuery,
    absensiList,
    izinPendingList,
     rekapList,
    totalKaryawan,
    totalAkun,
    hadirHariIni,
    totalIzinPending
  }
}