import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2, ScanFace } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAdmin } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'
import bgKantor from '@/assets/BG-KANTOR.jpg'

const schema = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi'),
})

type FormData = z.infer<typeof schema>

export default function LoginAdmin() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [showPass, setShowPass] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginAdmin(data)
      const { token, admin } = res.data.data
      setAuth(token, admin, 'admin')
      toast.success('Selamat datang, ' + admin.nama)
      navigate('/admin/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Login gagal')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgKantor})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    > 
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px]" />

      <div className="relative z-10 w-full max-w-sm"> 
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md mb-4 shadow-lg">
            <ScanFace className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-white text-xl font-semibold tracking-wide">SIFADES</h1>
          <p className="text-white/60 text-xs mt-1 text-center max-w-[220px] leading-relaxed">
            Sistem Absensi Face Recognition Desa
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-3xl rounded-xl p-6">
          <div className="mb-5">
            <h2 className="text-white text-lg font-semibold">Login Admin</h2>
            <p className="text-white/60 text-xs mt-1">Masuk ke panel administrasi</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-white/80 text-xs">Username</Label>
              <Input
                id="username"
                placeholder="Masukkan username"
                className="bg-white/20 border-white/20 text-white placeholder:text-white/40 
                  focus-visible:ring-2 focus-visible:ring-white/40 
                  focus-visible:border-transparent 
                  rounded-xl transition-all duration-200"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-xs text-red-300">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-white/80 text-xs">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/40 
                    focus-visible:ring-2 focus-visible:ring-white/40 
                    focus-visible:border-transparent 
                    rounded-xl pr-10 transition-all duration-200"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                    text-white/50 hover:text-white transition"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-300">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black font-semibold 
                hover:bg-white/90 active:scale-[0.98] 
                transition-all duration-200 rounded-xl shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isSubmitting ? 'Memproses...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}