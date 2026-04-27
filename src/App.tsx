import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import AdminLayout from '@/components/layout/AdminLayout'
import UserLayout from '@/components/layout/UserLayout'
import LoginAdmin from '@/pages/auth/LoginAdmin'
import LoginUser from '@/pages/auth/LoginUser'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminUsers from '@/pages/admin/AdminUsers'
import AdminAkun from './pages/admin/AdminAkun'
import AdminAbsensi from '@/pages/admin/AdminAbsensi'
import AdminIzin from '@/pages/admin/AdminIzin' 
import UserDashboard from '@/pages/user/UserDashboard'
import UserEnrollments from '@/pages/user/UserEnrollment'
import UserAbsensi from '@/pages/user/UserAbsensi'
import UserIzin from '@/pages/user/UserIzin'
import UserRiwayat from '@/pages/user/UserRiwayat'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes> 
            <Route path="/" element={<Navigate to="/login/user" replace />} />
  
            <Route path="/login/admin" element={<LoginAdmin />} />
            <Route path="/login/user"  element={<LoginUser />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="akun" element={<AdminAkun/>} />
              <Route path="absensi" element={<AdminAbsensi />} />
              <Route path="izin" element={<AdminIzin />} />
            </Route> 

            <Route path="/user" element={<UserLayout />}>
              <Route index element={<Navigate to="/user/dashboard" replace />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="riwayat" element={<UserRiwayat />} />
              <Route path="enrollments" element={<UserEnrollments />} />
              <Route path="absensi" element={<UserAbsensi />} />
              <Route path="izin" element={<UserIzin />} />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
      
    </QueryClientProvider>
  )
}