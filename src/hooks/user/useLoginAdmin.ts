import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getAbsensiAdmin, getRekapAbsensi, exportAbsensi } from '@/api/absensi'

export function useAdminAbsensi() {
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState('all')
  const [tahunExport, setTahunExport] = useState(new Date().getFullYear().toString())

  const { data, isLoading } = useQuery({
    queryKey: ['absensi-admin', tanggal, status],
    queryFn: () =>
      getAbsensiAdmin({
        tanggal,
        ...(status !== 'all' ? { status } : {}),
      }),
  })

  const { data: rekap } = useQuery({
    queryKey: ['rekap', tanggal],
    queryFn: () => getRekapAbsensi({ tanggal }),
  })

  const exportMutasi = useMutation({
    mutationFn: () => exportAbsensi(parseInt(tahunExport)),
    onSuccess: (res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `laporan_absensi_${tahunExport}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Laporan berhasil diunduh')
    },
    onError: () => toast.error('Gagal mengunduh laporan'),
  })

  return {
    tanggal, setTanggal,
    status, setStatus,
    tahunExport, setTahunExport,
    data, isLoading,
    rekap,
    exportMutasi,
  }
}