import api from '@/api/axios'

export const getAkuns = async (params: any) => {
    const res = await api.get('admin/akun', {params})
    return res.data
}

export const toggleAkun = async (id: number) => {
    const res = await api.patch(`/admin/akun/${id}/toggle`) 
    return res.data  
} 

export const resetPassword = async (id: number) => {
  const res = await api.post(`/admin/akun/${id}/reset-password`)
  return res.data
}

export const deleteAkun = async (id: number) => {
    const res = await api.delete(`/admin/akun/${id}`)
    return res.data
}