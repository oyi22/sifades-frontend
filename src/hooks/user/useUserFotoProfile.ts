import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadFotoSelf, deleteFotoSelf } from '@/api/users'
import { toast } from 'sonner'

export function useUserFotoProfile() {
  const queryClient = useQueryClient()
  const [preview, setPreview] = useState<string | null>(null)

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadFotoSelf(file),
    onSuccess: () => {
      toast.success('Foto profil berhasil diperbarui')
      setPreview(null)
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
    },
    onError: () => {
      toast.error('Gagal memperbarui foto profil')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteFotoSelf,
    onSuccess: () => {
      toast.success('Foto profil berhasil dihapus')
      setPreview(null)
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
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