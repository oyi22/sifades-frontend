import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent,  DropdownMenuItem,  DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import {  LayoutDashboard,  Users, ClipboardList, FileCheck,  ScanFace, ChevronUp, User2,  LogOut, KeyRound} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { logoutAdmin } from '@/api/auth'
import { Link } from 'react-router-dom'  

const navItems = [
  { title: 'Dashboard',    url: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Data Karyawan', url: '/admin/users',     icon: Users },
  { title: 'Data Akun',    url: '/admin/akun', icon: KeyRound},
  { title: 'Absensi',      url: '/admin/absensi',   icon: ClipboardList },
  { title: 'Izin',         url: '/admin/izin',      icon: FileCheck },
]

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, clearAuth } = useAuthStore()

  const handleLogout = async () => {
    try { await logoutAdmin() } catch {}
    clearAuth()
    navigate('/login/admin')
  }

  return (
    <Sidebar collapsible="icon" > 
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <ScanFace className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">SIFADES</span>
                    <span className="truncate text-xs text-muted-foreground">Sistem Absensi</span>
                  </div>
              </Link> 
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
 
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                      asChild
                        isActive={location.pathname === item.url}
                        tooltip={item.title}
                        className="
                          text-white
                          hover:bg-[oklch(0.22_0_0)]
                          data-[active=true]:bg-[oklch(0.35_0_0)]
                          data-[active=true]:text-white
                          transition-colors">
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                        
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
 
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold">
                    {(user as any)?.nama?.charAt(0)?.toUpperCase() ?? 'A'}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{(user as any)?.nama ?? 'Admin'}</span>
                    <span className="truncate text-xs text-muted-foreground">Administrator</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem className="gap-2">
                  <User2 className="size-4" />
                  <span>{(user as any)?.nama ?? 'Admin'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={handleLogout}>
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
 
      <SidebarRail />
    </Sidebar>
  )
}