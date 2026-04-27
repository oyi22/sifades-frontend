import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Eye, EyeOff, ScanFace } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { loginUser } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  username: z.string().min(1, 'Nama lengkap wajib diisi'),
  password: z.string().min(1, 'Password Wajib diisi'),
})

type FormData = z.infer<typeof schema>

export default function LoginUser() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)

      const res = await loginUser(data)
      const { token, user } = res.data.data

      setAuth(token, user, 'user')

      toast.success('Selamat datang, ' + user.nama_lengkap)
      navigate('/user/dashboard')

    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
 
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 flex items-center justify-center border border-zinc-300 rounded-xl bg-white">
            <ScanFace className="h-6 w-6 text-zinc-700" />
          </div>

          <h1 className="text-xl font-semibold tracking-wide mt-4">
            SIFADES
          </h1>

          <p className="text-xs text-zinc-500 mt-1">
            Sistem Absensi Terintegrasi
          </p>
        </div>

        <Card className="rounded-xl border border-zinc-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Login Sistem
            </CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              Masukkan identitas resmi untuk melanjutkan
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
 
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input
                  placeholder="Masukkan nama sesuai data"
                  className="h-11 rounded-md border-zinc-300 focus-visible:ring-0 focus-visible:border-zinc-500"
                  {...register('username')}
                />
                {errors.username && (
                  <p className="text-xs text-red-500">{errors.username.message}</p>
                )}
              </div>
 
              <div className="space-y-2">
                <Label>Tempat Tanggal Lahir</Label>

                <div className="relative">
                  <Input
                    type={showPass ? 'text' : 'password'}
                    placeholder="madiun08041972"
                    className="h-11 rounded-md border-zinc-300 pr-10 focus-visible:ring-0 focus-visible:border-zinc-500"
                    {...register('password')}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  >
                    {showPass ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
 
              <Button
                type="submit"
                className="w-full h-11 rounded-md bg-black text-white hover:bg-zinc-800 transition"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <ScanFace className="h-4 w-4 animate-pulse" />
                    <span>Memproses...</span>
                  </div>
                ) : (
                  'Masuk Sistem'
                )}
              </Button>

              <p className="text-center text-[11px] text-zinc-400 pt-2">
                © SIFADES - Government Attendance System
              </p>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}