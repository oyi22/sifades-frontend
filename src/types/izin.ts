import type { User } from "@/types/user" 

 export interface Izin {
  id: number
  user_id: number
  tipe: 'dinas' | 'sakit' | 'lainnya'
  tanggal_mulai: string        
  tanggal_selesai: string      
  durasi_hari: number          
  alasan: string | null
  file_surat: string | null     
  status: 'pending' | 'disetujui' | 'ditolak'
  catatan_admin?: string | null
  sudah_diperpanjang?: boolean  
  notif_wa_pengajuan?: boolean
  notif_wa_validasi?: boolean
  user?: User
  validator?: User
}

export interface IzinQuota {
    id: number
    user_id: number
    bulan: number
    tahun: number
    sisa_slot: number
}

export interface NotifikasiLog {
    id: number
    izin_id?: number
    tipe: string
    pesan: string
    terkirim: boolean
    dikirim_pada?: string
    user?: User
    izin: Izin
}
