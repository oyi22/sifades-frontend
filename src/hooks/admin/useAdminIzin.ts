import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getIzinAdmin, validasiIzin, hapusIzin, perpanjangIzin, getRiwayatNotif } from '@/api/izin'

export function useAdminIzin() {
  const qc = useQueryClient() 
  const [statusFilter, setStatusFilter] = useState('pending') 
  const [selected, setSelected] = useState<any>(null)
  const [open, setOpen]         = useState(false)
  const [aksi, setAksi]         = useState<'disetujui' | 'ditolak'>('disetujui')
  const [catatan, setCatatan]   = useState('') 
  const [perpanjangOpen, setPerpanjangOpen] = useState(false)
  const [perpanjangTarget, setPerpanjangTarget] = useState<any>(null)
  const [tanggalSelesaiBaru, setTanggalSelesaiBaru] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifTarget, setNotifTarget] = useState<any>(null)
 
  const { data, isLoading } = useQuery({
    queryKey: ['izin-admin', statusFilter],
    queryFn: () =>
      getIzinAdmin({ status: statusFilter === 'all' ? undefined : statusFilter }),
  })

  const izinList = Array.isArray(data?.data?.data?.data)
    ? data.data.data.data
    : Array.isArray(data?.data.data)
    ? data.data.data
    : []
 
  const { data: notifData, isLoading: notifLoading } = useQuery({
    queryKey: ['notif-log', notifTarget?.id],
    queryFn: () => getRiwayatNotif(notifTarget.id).then(r => r.data.data),
    enabled: notifOpen && !!notifTarget?.id,
  })
 
  const validasiMutasi = useMutation({
    mutationFn: () =>
      validasiIzin(selected.id, { status: aksi, catatan_admin: catatan }),
    onSuccess: () => {
      toast.success(`Izin berhasil ${aksi === 'disetujui' ? 'disetujui' : 'ditolak'}`)
      qc.invalidateQueries({ queryKey: ['izin-admin'] })
      setOpen(false)
      setCatatan('')
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message ?? 'Gagal memvalidasi izin'),
  })
 
  const perpanjangMutasi = useMutation({
    mutationFn: () =>
      perpanjangIzin(perpanjangTarget.id, { tanggal_selesai_baru: tanggalSelesaiBaru }),
    onSuccess: () => {
      toast.success('Izin berhasil diperpanjang')
      qc.invalidateQueries({ queryKey: ['izin-admin'] })
      setPerpanjangOpen(false)
      setTanggalSelesaiBaru('')
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message ?? 'Gagal memperpanjang izin'),
  })
 
  const hapusMutasi = useMutation({
    mutationFn: (id: number) => hapusIzin(id),
    onSuccess: () => {
      toast.success('Data izin berhasil dihapus')
      qc.invalidateQueries({ queryKey: ['izin-admin'] })
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message ?? 'Gagal menghapus izin'),
  })
 
  const openValidasi = (item: any, tipe: 'disetujui' | 'ditolak') => {
    setSelected(item)
    setAksi(tipe)
    setCatatan('')
    setOpen(true)
  }

  const openPerpanjang = (item: any) => {
    setPerpanjangTarget(item)
    setTanggalSelesaiBaru('')
    setPerpanjangOpen(true)
  }

  const openNotif = (item: any) => {
    setNotifTarget(item)
    setNotifOpen(true)
  }

  return { 
    statusFilter, setStatusFilter,
 
    izinList, isLoading,
 
    selected, open, setOpen,
    aksi, catatan, setCatatan,
    openValidasi, validasiMutasi,
 
    perpanjangOpen, setPerpanjangOpen,
    perpanjangTarget,
    tanggalSelesaiBaru, setTanggalSelesaiBaru,
    openPerpanjang, perpanjangMutasi,
 
    notifOpen, setNotifOpen,
    notifTarget, notifData, notifLoading,
    openNotif,
 
    hapusMutasi,
  }
}