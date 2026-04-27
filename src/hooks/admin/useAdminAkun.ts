import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { getAkuns, resetPassword, toggleAkun, deleteAkun } from '@/api/akun'
import type { Akun } from '@/types/akun'

export function useAdminAkun() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
 
  const { data, isLoading } = useQuery({
    queryKey: ['akuns', search ?? '', page ?? 1],
    // queryFn: () => getAkuns({ search, page }).then(res => res.data.data), // ambil data array sesuai interface
    queryFn: async() => {
      const res = await getAkuns({ search, page })
      console.log('API RESULT: ', res)
      return res?.data ?? []
    }
  })
 
  const akuns: Akun[] = data?.data ?? []

  const toggleMutasi = useMutation({
    mutationFn: (id: number) => toggleAkun(id),
    onSuccess: () => {
      toast.success('Status akun berhasil diubah')
      qc.invalidateQueries({ queryKey: ['akuns'] })
    },
    
    onError: () => toast.error('Gagal ubah status'),
    
  })

  const resetMutasi = useMutation({
    
    mutationFn: (id:number) => resetPassword(id),
    onSuccess: (res) => {
      toast.success('Password berhasil di reset')
      return res
    },
    onError: () => toast.error('gagal reset password'),
  })
  
  const deleteMutasi = useMutation({
    mutationFn: (id:number) => deleteAkun(id),
    onSuccess: () => {
      toast.success('Akun Berhasil dihapus')
      qc.invalidateQueries({ queryKey: ['akuns'] })
    },
    onError: () => toast.error('gagal hapus akun'),
  })


  return {
    search,
    setSearch,
    page,
    setPage,
    akuns,
    isLoading,
    totalPages: data?.last_page || 1,  
    toggleMutasi,
    resetMutasi,
    deleteMutasi
  }
}