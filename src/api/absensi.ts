import api from '@/api/axios'

export const getAbsensiAdmin = async (params?: object) => {
  const { data } = await api.get('/admin/absensi', { params })
  return data
}

export const getRekapAbsensi = async (params?: object) => {
  const { data } = await api.get('/admin/absensi/rekap', { params })
  return data
}

export const exportAbsensi = async (tahun: number) => {
  const { data } = await api.get('/admin/absensi/export', {
    params: { tahun },
    responseType: 'blob'
  })
  return data
}

export const scanAbsensi = async (dataBody: object) => {
  const { data } = await api.post('/user/absensi/scan', dataBody)
  return data
}

export const cekAbsensi = async () => {
  const { data } = await api.get('/user/absensi/cek')
  return data
}

export const riwayatAbsensi = async () => {
  const { data } = await api.get('/user/absensi/riwayat')
  return data
}