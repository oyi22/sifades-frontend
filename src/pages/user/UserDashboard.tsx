import { useNavigate, useOutletContext } from 'react-router-dom'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useUserDashboard } from '@/hooks/user/useUserDashbboard'
import StatusCard from '@/components/user/StatusCard'
import UserInfoCard from '@/components/user/UserInfoCard'
import ActionButtons from '@/components/user/ActionButton'
import ProfileAvatar from '@/components/user/ProfileAvatar'
import { Button } from '@/components/ui/button' 

export default function UserDashboard() {
  const navigate = useNavigate()
  const { handleLogout }: any = useOutletContext()
  const { user, sudahAbsen, izinHariIni } = useUserDashboard()

  return (
  <div className="min-h-screen bg-black">
    <div className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto min-h-screen flex flex-col">
 
      <div className="bg-black px-4 pt-4 pb-16 md:pb-20">

        <div className="flex items-center justify-between mb-5">
          <h1 className="text-base md:text-lg font-semibold text-white">
            Dashboard
          </h1>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-500 hover:bg-red-500/10"
          >
            Logout
          </Button>
        </div>
 
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 items-center gap-2">

          <div className="transition-transform duration-200 hover:scale-105">
            <ProfileAvatar
              currentFotoUrl={user?.foto_profile_url}
              namaLengkap={user?.nama_lengkap}
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-sm md:text-base font-medium text-white">
              {user?.nama_lengkap}
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })}
            </p>
          </div>

        </div>
      </div>
 
      <div className="bg-white rounded-t-[28px] -mt-7 flex-1 shadow-xl">
  
        <div className="px-4 pt-4 mb-2 md:max-w-md">
          <div className="relative flex items-center bg-zinc-100 rounded-2xl p-1 h-11">
 
            <span
              className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-black transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)]"
              style={{ transform: 'translateX(0%)' }}
              aria-hidden="true"
            />

            <button
              onClick={() => navigate('/user/dashboard')}
              className="relative z-10 flex-1 text-sm font-medium h-full rounded-xl text-white transition-colors duration-300"
            >
              Home
            </button>

            <button
              onClick={() => navigate('/user/riwayat')}
              className="relative z-10 flex-1 text-sm font-medium h-full rounded-xl text-zinc-500 hover:text-zinc-800 transition-colors duration-300"
            >
              Riwayat
            </button>
          </div>
        </div>

        <div className="divide-y divide-border md:divide-y-0 md:grid md:grid-cols-2 md:gap-4 md:p-4">

          <div className="px-4 py-4 md:p-4 md:rounded-2xl md:border md:border-black/5 md:shadow-sm">
            <StatusCard sudahAbsen={sudahAbsen} izinHariIni={izinHariIni} />
          </div>

          <div className="px-4 py-4 md:p-4 md:rounded-2xl md:border md:border-black/5 md:shadow-sm">
            <UserInfoCard user={user} />
          </div>

          {!sudahAbsen && !izinHariIni && (
            <div className="px-4 py-4 md:col-span-2 md:p-4 md:rounded-2xl md:border md:border-black/5 md:shadow-sm">
              <ActionButtons navigate={navigate} user={user} />
            </div>
          )}

        </div>
      </div>
    </div>
  </div>
)
}