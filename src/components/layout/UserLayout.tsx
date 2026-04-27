import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { logoutUser } from '@/api/auth'

export default function UserLayout() {
  const { token, role, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  if (!token || role !== 'user') {
    return <Navigate to="/login/user" replace />
  }

  const handleLogout = async () => {
    await logoutUser()
    clearAuth()
    navigate('/login/user')
  }

  return (
    <div className="min-h-screen bg-background">
      <Outlet context={{ handleLogout }} />
    </div>
  )
}