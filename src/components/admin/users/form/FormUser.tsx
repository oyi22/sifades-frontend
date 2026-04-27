import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import FormField from '@/components/admin/users/form/FormField'
import JabatanSelect from '@/components/admin/users/form/JabatanSelect'
import JenisKelaminSelect from '@/components/admin/users/form/JenisKelaminSelect'
import FormHeader from '@/components/admin/users/form/FormHeader'

export default function FormUser({
  open,
  setOpen,
  selected,
  register,
  handleSubmit,
  errors,
  onSubmit,
  jabatanVal,
  setValue,
  watch,
  isPending,
}: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">

        <DialogHeader>
          <FormHeader selected={selected} />
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
        >
          <div className="md:col-span-2">
            <FormField label="Nama Lengkap *" error={errors.nama_lengkap}>
              <Input {...register('nama_lengkap')} />
            </FormField>
          </div>

          <FormField label="NIK *" error={errors.nik}>
            <Input {...register('nik')} className="font-mono" />
          </FormField>

          <FormField label="Tempat Lahir *" error={errors.tempat_lahir}>
            <Input {...register('tempat_lahir')} />
          </FormField>

          <FormField label="Tanggal Lahir *" error={errors.tanggal_lahir}>
            <Input type="date" {...register('tanggal_lahir')} />
          </FormField>

          <FormField label="Alamat *" error={errors.alamat}>
            <Textarea {...register('alamat')} />
          </FormField>

          <FormField label="Jabatan *">
            <JabatanSelect value={jabatanVal} setValue={setValue} />
          </FormField>

          <FormField label="Jenis Kelamin *" error={errors.jenis_kelamin}>
            <JenisKelaminSelect
              value={watch('jenis_kelamin')}
              setValue={setValue}
            />
          </FormField>

          <FormField label="No WA" error={errors.no_wa}>
            <Input {...register('no_wa')} />
          </FormField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              {selected ? 'Simpan' : 'Tambah'}
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}