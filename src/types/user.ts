export type Jabatan = 'sekretaris_desa' | 'kaur' | 'pelayanan' | 'karyawan'

export const JABATAN_LABEL: Record<Jabatan, string> = {
  sekretaris_desa: 'Sekretaris Desa',
  kaur: 'Kaur',
  pelayanan: 'Pelayanan',
  karyawan: 'Karyawan',
}

export interface User {
  id: number
  nama_lengkap: string
  nik: string
  jenis_kelamin: 'L' | 'P'
  alamat: string
  tempat_lahir: string
  tanggal_lahir: string
  jabatan: Jabatan
  no_wa?: string
  foto_profile_url?: string | null
  sudah_enrollment: boolean
  role: 'user'
}