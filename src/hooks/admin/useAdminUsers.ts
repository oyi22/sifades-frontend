import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { getUsers, createUser, updateUser, deleteUser } from '@/api/users'
import type { User } from '@/types'

const schema = z.object({
  nama_lengkap: z.string().min(2),
  nik: z.string().length(16),
  alamat: z.string().min(5),
  tempat_lahir: z.string().min(2, 'Tempat Lahir wajib di isi'),
  tanggal_lahir: z.string().min(1, 'Tanggal Lahir wajib di isi'),
  jabatan: z.enum(['sekretaris_desa', 'kaur', 'pelayanan', 'karyawan']),
  jenis_kelamin: z.enum(['L', 'P']),
  no_wa: z.string().optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

export function useAdminUsers() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [jabatan, setJabatan] = useState('all')
  const [page, setPage] = useState(1)

  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selected, setSelected] = useState<User | null>(null)
 
  const { data, isLoading } = useQuery({
    queryKey: ['users', search, jabatan, page],
    queryFn: () =>
      getUsers({
        search,
        ...(jabatan !== 'all' ? { jabatan } : {}),
        page,
      }),
    placeholderData: (prev) => prev,
  })
  console.log('RESPONSE API:', data)

    const meta = data?.data || {}
    const users: User[] = meta.data || []
    const totalPages = meta.last_page || 1
    const totalData = meta.total || 0
 
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { 
      jabatan: 'karyawan', 
      no_wa: '',
      tempat_lahir: '',
      tanggal_lahir: '', 
    },
})

  const jabatanVal = form.watch('jabatan')
 
  const openCreate = () => {
    setSelected(null)
    form.reset({ 
      jabatan: 'karyawan', 
      no_wa: '',
      tempat_lahir: '',
      tanggal_lahir: '', 
    })
    setFormOpen(true)
  }

  const openEdit = (user: User) => {
    setSelected(user)
    form.reset({
      nama_lengkap: user.nama_lengkap,
      nik: user.nik,
      alamat: user.alamat,
      jabatan: user.jabatan,
      no_wa: user.no_wa ?? '',
      tempat_lahir: user.tempat_lahir,
      tanggal_lahir: user.tanggal_lahir,
    })
    setFormOpen(true)
  }

  const openDelete = (user: User) => {
    setSelected(user)
    setDeleteOpen(true)
  }
 
  const saveMutasi = useMutation({
    mutationFn: (data: FormData) =>
      selected ? updateUser(selected.id, data) : createUser(data),
    onSuccess: (_, vars) => {
      toast.success(
        selected
          ? `Data ${vars.nama_lengkap} berhasil diperbarui`
          : `${vars.nama_lengkap} berhasil ditambahkan`
      )
      qc.invalidateQueries({ queryKey: ['users'] })
      setFormOpen(false)
    },
    onError: (err: any) => {
      const msg =
        err.response?.data?.message ?? 'Gagal menyimpan data'
      toast.error(msg)
    },
  })

  const hapusMutasi = useMutation({
    mutationFn: () => deleteUser(selected!.id),
    onSuccess: () => {
      toast.success(`${selected?.nama_lengkap} berhasil dihapus`)
      qc.invalidateQueries({ queryKey: ['users'] })
      setDeleteOpen(false)
    },
    onError: () => toast.error('Gagal menghapus anggota'),
  })

  const onSubmit = (data: FormData) => {
    saveMutasi.mutate({
      ...data,
      no_wa: data.no_wa || undefined,
    })
  }

  return { 
    search, setSearch,
    jabatan, setJabatan,
    page, setPage,

    formOpen, setFormOpen,
    deleteOpen, setDeleteOpen,
    selected,

    users, isLoading,
    totalPages, totalData,
 
    ...form,
    errors: form.formState.errors,
    jabatanVal,
 
    openCreate,
    openEdit,
    openDelete,
    onSubmit,
 
    saveMutasi,
    hapusMutasi,
  }
}