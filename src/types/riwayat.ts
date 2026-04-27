export interface RiwayatItem {
  id: number
  tipe: 'absensi' | 'izin' | 'notif_wa'
  judul: string
  deskripsi: string | null
  status: string | null
  referensi_tipe: string | null
  referensi_id: number | null
  meta: Record<string, unknown> | null
  terjadi_pada: string
}

export interface RiwayatPaginated {
  data: RiwayatItem[]
  current_page: number
  last_page: number
  total: number
  per_page: number
}

export interface RiwayatRingkasan {
  total: number
  absensi: number
  izin: number
  notif_wa: number
}