import { Button } from '@/components/ui/button'
import { Camera, FileText, UserCheck } from 'lucide-react'
import type { User } from '@/types'

interface ActionButtonProps {
  navigate: (path: string) => void
  user: User | null
}

export default function ActionButtons({ navigate }: ActionButtonProps) {
  const baseClass =
    'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-600 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] rounded-xl transition-all duration-200'

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Button
          className={`${baseClass} h-14 flex-col gap-1.5 text-sm font-medium`}
          onClick={() => navigate('/user/absensi')} 
        >
          <Camera className="h-5 w-5" />
          Absensi
        </Button>

        <Button
          className={`${baseClass} h-14 flex-col gap-1.5 text-sm font-medium`}
          onClick={() => navigate('/user/izin')}
        >
          <FileText className="h-5 w-5" />
          Ajukan Izin
        </Button>
      </div>

      <Button
        className={`${baseClass} w-full h-12 gap-2 text-sm font-medium`}
        onClick={() => navigate('/user/enrollments')}  
      >
        <UserCheck className="h-4 w-4" />
        Daftarkan Wajah (Enrollment)
      </Button>
    </div>
  )
}