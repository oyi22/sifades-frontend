import api from '@/api/axios'

export const loginAdmin = (data: { username: string; password: string }) =>
  api.post('/login/admin', data)

export const loginUser = (data: { username: string; password: string }) =>
  api.post('/login/user', data)

export const logoutAdmin = () => api.post('/admin/logout')
export const logoutUser  = () => api.post('/user/logout')