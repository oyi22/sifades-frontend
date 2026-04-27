export interface DashboardProps {
  totalKaryawan: number
  totalAkun: number
  hadirHariIni: number
  totalIzinPending: number
  loadingUsers: boolean
  loadingAkun: boolean
  loadingAbsensi: boolean
  loadingIzin: boolean
}

export type Activity = {
  id: string
  nama: string
  aksi: string
  waktu: string
  type: 'absensi' | 'izin'
}