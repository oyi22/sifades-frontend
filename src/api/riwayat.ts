import type { RiwayatPaginated, RiwayatRingkasan } from "@/types/riwayat";
import api from '@/api/axios'

export const getRiwayat = async (params?: object): Promise<{ success: boolean; data: RiwayatPaginated }> => {
  const { data } = await api.get('/user/riwayat', { params })
  return data
}

export const getRingkasanRiwayat = async (): Promise<{ success: boolean; data: RiwayatRingkasan }> => {
  const { data } = await api.get('/user/riwayat/ringkasan')
  return data
}

export const hapusRiwayatSatu = async (id: number) => {
  const { data } = await api.delete(`/user/riwayat/${id}`)
  return data
}

export const hapusSemuaRiwayat = async (tipe?: string) => {
  const { data } = await api.delete('/user/riwayat', { params: tipe ? { tipe } : {} })
  return data
}