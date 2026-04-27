import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/api/axios'

export const POSES = [
  { key: 'netral', label: 'Wajah Netral' },
  { key: 'senyum', label: 'Senyum' },
  { key: 'kedip',  label: 'Kedipkan Mata' },
  { key: 'kanan',  label: 'Tengok Kanan' },
  { key: 'kiri',   label: 'Tengok Kiri' },
]

export const TARGET = 30

export function useUserTraining() {
  const navigate = useNavigate()
 
  const videoRef    = useRef<HTMLVideoElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [poseIdx, setPoseIdx]     = useState(0)
  const [capturing, setCapturing] = useState(false)
  const [done, setDone]           = useState(false)

  const { data: statusData, refetch } = useQuery({
    queryKey: ['training-status'],
    queryFn: () => api.get('/user/training/status'),
  })

  const poses: Record<string, number> = statusData?.data?.data?.poses ?? {}
  const currentPose = POSES[poseIdx]
  const currentCount = poses[currentPose?.key] ?? 0

  const allDone = POSES.every((p) => (poses[p.key] ?? 0) >= TARGET)

  useEffect(() => {
  navigator.mediaDevices.getUserMedia({
    video: true
  })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      } 
      return navigator.mediaDevices.enumerateDevices()
    })
    .then((devices) => {
      const videoDevices = devices.filter(d => d.kind === 'videoinput')
      console.log("LIST CAMERA:", videoDevices)
    })
    .catch((err) => {
      console.error(err)
      toast.error('Tidak dapat mengakses kamera')
    })

  return () => {
    const stream = videoRef.current?.srcObject as MediaStream
    stream?.getTracks().forEach((t) => t.stop())
    if (intervalRef.current) clearInterval(intervalRef.current)
  }
  }, [])

  const frameMutasi = useMutation({
    mutationFn: (base64: string) =>
      api.post('/user/training/frame', { pose: currentPose.key, frame: base64 }),
    onSuccess: (res) => {
      const result = res.data?.data
      refetch()

      if (result?.jumlah >= TARGET) {
        stopCapture()

        if (poseIdx < POSES.length - 1) {
          setTimeout(() => {
            setPoseIdx((p) => p + 1)
            toast.success(`Pose "${currentPose.label}" selesai`)
          }, 500)
        } else {
          toast.success('Semua pose selesai')
        }
      }
    },
  })

  const selesaiMutasi = useMutation({
    mutationFn: () => api.post('/user/training/selesai'),
    onSuccess: () => {
      toast.success('Training selesai')
      setDone(true)
      setTimeout(() => navigate('/user/dashboard'), 2000)
    },
  })

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const video  = videoRef.current

    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.save()
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0)
    ctx.restore()

    const base64 = canvas.toDataURL('image/jpeg', 0.8)
    frameMutasi.mutate(base64)
  }, [frameMutasi])

  const startCapture = () => {
    setCapturing(true)
    intervalRef.current = setInterval(captureFrame, 300)
  }

  const stopCapture = () => {
    setCapturing(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  return {
    videoRef,
    canvasRef,
    poseIdx,
    capturing,
    done,
    poses,
    currentPose,
    currentCount,
    allDone,
    startCapture,
    stopCapture,
    selesaiMutasi,
  }
}