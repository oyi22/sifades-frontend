import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadUser, deleteFotoUser } from '@/api/users'
import { toast } from 'sonner'

export function useAdminFotoProfile(userId: number) {
  const queryClient = useQueryClient()
  const [preview, setPreview] = useState<string | null>(null)

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadUser(userId, file),
    onSuccess: () => {
      toast.success('Foto profil berhasil diubah')
      setPreview(null)
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
    },
    onError: () => {
      toast.error('Gagal mengubah foto profil')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteFotoUser(userId),
    onSuccess: () => {
      toast.success('Foto profil berhasil dihapus')
      setPreview(null)
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
    },
    onError: () => {
      toast.error('Gagal menghapus foto profil')
    },
  })

  const handleFileChange = (file: File) => {
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    uploadMutation.mutate(file)
  }

  return {
    preview,
    setPreview,
    handleFileChange,
    uploadMutation,
    deleteMutation,
    isUploading: uploadMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}