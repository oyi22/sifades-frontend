// import { create } from 'zustand'
// import type { Admin, User } from '@/types'

// type AuthUser = (Admin | User) | null

// interface AuthStore {
//   token: string | null
//   user: AuthUser
//   role: 'admin' | 'user' | null
//   setAuth: (token: string, user: AuthUser, role: 'admin' | 'user') => void
//   clearAuth: () => void
// }

// export const useAuthStore = create<AuthStore>((set) => ({
//   token: localStorage.getItem('token'),
//   user: JSON.parse(localStorage.getItem('user') || 'null'),
//   role: localStorage.getItem('role') as 'admin' | 'user' | null,

//   setAuth: (token, user, role) => {
//     localStorage.setItem('token', token)
//     localStorage.setItem('user', JSON.stringify(user))
//     localStorage.setItem('role', role)
//     set({ token, user, role })
//   },

//   clearAuth: () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     localStorage.removeItem('role')
//     set({ token: null, user: null, role: null })
//   },
// }))

import { create } from 'zustand'
import type { Admin, User } from '@/types'

type AuthUser = (Admin | User) | null

interface AuthStore {
  token: string | null
  user: AuthUser
  role: 'admin' | 'user' | null
  setAuth: (token: string, user: AuthUser, role: 'admin' | 'user') => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => {
  let token: string | null = null
  let user: AuthUser = null
  let role: 'admin' | 'user' | null = null

  try {
    const storedUser = localStorage.getItem('user')
    if (storedUser && storedUser !== 'undefined') {
      user = JSON.parse(storedUser)
    }

    const storedToken = localStorage.getItem('token')
    token = storedToken && storedToken !== 'undefined' ? storedToken : null

    const storedRole = localStorage.getItem('role')
    role = storedRole && storedRole !== 'undefined' ? (storedRole as 'admin' | 'user') : null
  } catch (err) {
    console.warn('Error parsing auth from localStorage:', err)
    user = null
    token = null
    role = null
  }

  return {
    token,
    user,
    role,

    setAuth: (token, user, role) => {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('role', role)
      set({ token, user, role })
    },

    clearAuth: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      set({ token: null, user: null, role: null })
    },
  }
})