import { useState, useEffect } from 'react'
import { ajukanIzin, riwayatIzin, getSisaSlot, getIzinAktif } from '@/api/izin'
import { toast } from 'sonner'
import type { Izin } from '@/types'

export type TipeIzin = 'dinas' | 'sakit' | 'lainnya'

export function useUserIzin() {
  const [tipe, setTipeState] = useState<TipeIzin>('lainnya')
  const [tanggalMulai, setTanggalMulai] = useState('')
  const [tanggalSelesai, setTanggalSelesai] = useState('')
  const [alasan, setAlasan] = useState('')
  const [fileSurat, setFileSurat] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [riwayat, setRiwayat] = useState<Izin[]>([])
  const [izinAktif, setIzinAktif] = useState<Izin | null>(null)
  const [sisaSlot, setSisaSlot] = useState<number>(3)

  function setTipe(v: TipeIzin) {
    setTipeState(v)
    setFileSurat(null)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    try {
      const [rv, slot, aktif] = await Promise.all([
        riwayatIzin(),
        getSisaSlot(),
        getIzinAktif(),
      ])
      setRiwayat(rv.data.data?.data ?? [])
      setSisaSlot(slot.data.sisa_slot)
      setIzinAktif(aktif.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  async function submit() {
    if (!tanggalMulai || !tanggalSelesai) {
      toast.error('Tanggal wajib diisi')
      return
    }

    if (tanggalMulai > tanggalSelesai) {
      toast.error('Tanggal tidak valid')
      return
    }

    if (tipe === 'lainnya' && alasan.trim().length < 10) {
      toast.error('Alasan minimal 10 karakter')
      return
    }

    if ((tipe === 'sakit' || tipe === 'dinas') && !fileSurat) {
      toast.error('File surat wajib untuk tipe ini')
      return
    }

    setLoading(true)

    try {
      const fd = new FormData()
      fd.append('tipe', tipe)
      fd.append('tanggal_mulai', tanggalMulai)
      fd.append('tanggal_selesai', tanggalSelesai)

      if (alasan.trim()) {
        fd.append('alasan', alasan.trim())
      }

      if (fileSurat) {
        fd.append('file_surat', fileSurat)
      }

      const res = await ajukanIzin(fd)

      if (res.data.alerts?.length) {
        res.data.alerts.forEach((a: string) => toast.warning(a))
      }

      toast.success('Izin berhasil diajukan!')
      resetForm()
      fetchAll()

    } catch (err: any) {
      console.log(err.response?.data)

      const errors = err?.response?.data?.errors

      if (errors) {
        Object.values(errors).forEach((msgs: any) => {
          msgs.forEach((m: string) => toast.error(m))
        })
      } else {
        toast.error(err?.response?.data?.message ?? 'Gagal mengajukan izin.')
      }

    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setAlasan('')
    setFileSurat(null)
    setTanggalMulai('')
    setTanggalSelesai('')
    setTipeState('lainnya')
  }

  return {
    tipe, setTipe,
    tanggalMulai, setTanggalMulai,
    tanggalSelesai, setTanggalSelesai,
    alasan, setAlasan,
    fileSurat, setFileSurat,
    loading,
    riwayat,
    sisaSlot,
    izinAktif,
    submit,
  }
}