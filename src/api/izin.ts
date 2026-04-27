import api from '@/api/axios'
 
export const getIzinAdmin = async (params?: object) => {
  const res = await api.get('/admin/izin', { params })
  return res.data
}
export const getDetailIzin = (id: number)      => api.get(`/admin/izin/${id}`)
export const validasiIzin = (id: number, data: object) => api.patch(`/admin/izin/${id}/validasi`, data)
export const perpanjangIzin  = (id: number, data: { tanggal_selesai_baru: string }) => api.patch(`/admin/izin/${id}/perpanjang`, data)
export const hapusIzin = (id: number) => api.delete(`/admin/izin/${id}`)
export const getRiwayatNotif = (id: number) => api.get(`/admin/izin/${id}/notif`)
export const getSemuaNotif = () => api.get('/admin/notif')
 
export const ajukanIzin = (data: FormData)  => api.post('/user/izin', data)
export const riwayatIzin = () => api.get('/user/izin/riwayat')
export const getSisaSlot = () => api.get('/user/izin/sisa-slot')
export const getIzinAktif = () => api.get('/user/izin/aktif')
