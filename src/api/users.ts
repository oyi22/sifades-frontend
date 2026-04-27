import api from '@/api/axios'

export const getUsers = async (params?: object) => {
  const { data } = await api.get('/admin/users', { params })
  return data
}

export const getUser = async (id: number) => {
  const { data } = await api.get(`/admin/users/${id}`)
  return data
}

export const createUser = async (payload: object) => {
  const { data } = await api.post('/admin/users', payload)
  return data
}

export const updateUser = async (id: number, payload: object) => {
  const { data } = await api.put(`/admin/users/${id}`, payload)
  return data
}

export const deleteUser = async (id: number) => {
  const { data } = await api.delete(`/admin/users/${id}`)
  return data
}

export const toggleStatus = async (id: number) => {
  const { data } = await api.patch(`/admin/users/${id}/status`)
  return data
}

export const uploadUser = async(id: number, file: File) => {
  const form = new FormData()
  form.append('foto', file)
  const { data } = await api.post(`/admin/users/${id}/foto-profile`, form, {
    headers: { 'Content-Type' : 'multipart/form-data' },
  })

  return data
}

export const deleteFotoUser = async (id: number) => {
  const { data } = await api.delete(`/admin/users/${id}/foto-profile`)
  return data
}

export const uploadFotoSelf = async (file: File) => {
  const form = new FormData()
  form.append('foto', file)
  const { data } = await api.post(`/user/profile/foto`, form, {
    headers: { 'Content-Type' : 'multipart/form-data' },
  })

  return data
}

export const deleteFotoSelf = async() => {
  const { data } = await api.delete(`/user/profile/foto`)
  return data
}