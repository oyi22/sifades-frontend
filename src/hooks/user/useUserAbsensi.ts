import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { scanAbsensi } from '@/api/absensi'

export function useUserAbsensi() {
  const navigate = useNavigate()
  const videoRef  = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [capturing, setCapturing] = useState(false)

  const [lokasi, setLokasi] = useState<{
    lat: number
    lng: number
    nama: string
  } | null>(null)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: 640, height: 480 },
    })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setReady(true)
        }
      })
      .catch(() => toast.error('Tidak dapat mengakses kamera'))

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLokasi({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          nama: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
        })
      },
      () => toast.error('Tidak dapat mengambil lokasi')
    )

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const mutasi = useMutation({
    mutationFn: (payload: object) => scanAbsensi(payload),
    onSuccess: () => {
      toast.success('Absensi berhasil dicatat!')
      navigate('/user/dashboard')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? 'Absensi gagal')
      setCapturing(false)
    },
  })

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return

    setCapturing(true)

    const canvas = canvasRef.current
    const video  = videoRef.current
    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0)

    const base64 = canvas.toDataURL('image/jpeg', 0.85)

    mutasi.mutate({
      foto_absensi: base64,
      confidence_score: 0.95,
      lokasi: lokasi?.nama ?? null,
      latitude: lokasi?.lat ?? null,
      longitude: lokasi?.lng ?? null,
    })
  }, [lokasi, mutasi])

  return {
    videoRef,
    canvasRef,
    ready,
    capturing,
    lokasi,
    capture,
    isLoading: mutasi.isPending,
    navigate,
  }
}