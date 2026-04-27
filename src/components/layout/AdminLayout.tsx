import { Outlet, Navigate } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink,  BreadcrumbList, BreadcrumbPage,  BreadcrumbSeparator,} from '@/components/ui/breadcrumb'
import { AppSidebar } from './AppSidebar'
import { useAuthStore } from '@/store/authStore'
import { useLocation } from 'react-router-dom'

const breadcrumbMap: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/users':     'Data Anggota',
  '/admin/absensi':   'Absensi',
  '/admin/izin':      'Izin',
}

export default function AdminLayout() {
  const { token, role } = useAuthStore()
  const location = useLocation()

  if (!token || role !== 'admin') {
    return <Navigate to="/login/admin" replace />
  }

  const pageTitle = breadcrumbMap[location.pathname] ?? 'Admin'

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/admin/dashboard">SIFADES</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 w-full">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}