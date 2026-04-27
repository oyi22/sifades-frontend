import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input' 
import PageHeader from '@/components/shared/PageHeader'
import { useAdminAkun } from '@/hooks/admin/useAdminAkun'
import AkunTable from '@/components/admin/akun/AkunTable'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function AdminAkun() {
  const {
    search, setSearch,
    akuns, isLoading,
    toggleMutasi,
    resetMutasi,
    deleteMutasi
  } = useAdminAkun()

  const [resetPasswordResult, setResetPasswordResult] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Manajemen Akun"
        description="Kelola akun login perangkat desa"
      />
 
      <div className="relative max-w-[240px]">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Cari username..."
          className="pl-8 h-8 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
 
      <div className="rounded-lg border overflow-hidden">
        <AkunTable
          akuns={akuns}
          isLoading={isLoading}
          toggleMutasi={toggleMutasi}
          deleteMutasi={deleteMutasi}
          resetMutasi={{
            ...resetMutasi,
            mutate: async (id: number) => {
              const res = await resetMutasi.mutateAsync(id)
              setResetPasswordResult(res.password)
              setOpenDialog(true)
            }
          }}
        />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[300px]">
          <DialogHeader>
            <DialogTitle>Password baru</DialogTitle>
            <DialogDescription>
              Password berhasil di-reset. Simpan dengan aman.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center font-mono text-base bg-muted px-3 py-2.5 rounded-md tracking-widest">
            {resetPasswordResult}
          </div>
          <DialogFooter>
            <Button size="sm" onClick={() => setOpenDialog(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}