import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import PageHeader from '@/components/shared/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-react'
import { useAdminUsers } from '@/hooks/admin/useAdminUsers'
import FormUser from '@/components/admin/users/form/FormUser'
import UserTable from '@/components/admin/users/UserTable'

export default function AdminUsers() {
  const { 
    search, setSearch,
    jabatan, setJabatan,
    page, setPage,

    formOpen, setFormOpen,
    deleteOpen, setDeleteOpen,
    selected,
 
    users, isLoading,
    totalPages, totalData,

    register, handleSubmit, errors, setValue, watch,
    jabatanVal,

    openCreate, openEdit, openDelete,
    onSubmit,

    saveMutasi,
    hapusMutasi,
  } = useAdminUsers()

  return (
    <div>
      <PageHeader
        title="Data Karyawan"
        description={`${totalData} anggota terdaftar`}
        action={
          <Button onClick={openCreate} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Anggota 
          </Button>
        }
      />
 
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau NIK..."
            className="pl-9"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
        </div>

        <Select
          value={jabatan}
          onValueChange={(v) => {
            setJabatan(v)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Jabatan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sekretaris_desa">Sekretaris Desa</SelectItem>
            <SelectItem value="kaur">Kaur</SelectItem>
            <SelectItem value="pelayanan">Pelayanan</SelectItem>
            <SelectItem value="karyawan">Karyawan</SelectItem>
          </SelectContent>
        </Select>
      </div>
 
      <Card className="border-zinc-200">
        <CardContent className="p-0">
          <UserTable
            users={users}
            isLoading={isLoading}
            page={page}
            totalPages={totalPages}
            search={search}
            openEdit={openEdit}
            openDelete={openDelete}
            setPage={setPage}
          />
        </CardContent>
      </Card>
 
      <FormUser
        open={formOpen}
        setOpen={setFormOpen}
        selected={selected}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        jabatanVal={jabatanVal}
        setValue={setValue}
        watch={watch}
        isPending={saveMutasi.isPending}
      />
 
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Anggota?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan menghapus <strong>{selected?.nama_lengkap}</strong> (NIK: {selected?.nik}).
              Data absensi dan izin terkait juga akan terhapus. Aksi ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>

            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => hapusMutasi.mutate()}
              disabled={hapusMutasi.isPending}
            >
              {hapusMutasi.isPending && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}