import { useQuery } from '@tanstack/react-query'
import { cekAbsensi } from '@/api/absensi'
import { riwayatIzin } from '@/api/izin'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types'

export function useUserDashboard() {
  const { user } = useAuthStore()
  const u = user as User

  const { data: cek } = useQuery({
    queryKey: ['cek-absensi'],
    queryFn: cekAbsensi,
  })

  const { data: izinData } = useQuery({
    queryKey: ['riwayat-izin'],
    queryFn: riwayatIzin,
  })

  const sudahAbsen = cek?.data?.data?.sudah_absen ?? false

  const izinHariIni = izinData?.data?.data?.data?.find((i: any) => {
    const today = new Date().toISOString().split('T')[0]
    return i.tanggal === today
  })

  return {
    user: u,
    sudahAbsen,
    izinHariIni, 
  }
}