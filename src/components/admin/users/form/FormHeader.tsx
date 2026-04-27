import AvatarUpload from '@/components/admin/AvatarUpload'

export default function FormHeader({ selected }: any) {
  return (
    <>
      {selected && (
        <div className="flex justify-center py-2">
          <AvatarUpload
            userId={selected.id}
            currentFotoUrl={selected.foto_profile_url}
            namaLengkap={selected.nama_lengkap}
          />
        </div>
      )}

      <h2 className="text-lg font-semibold">
        {selected ? 'Edit Data Anggota' : 'Tambah Anggota Baru'}
      </h2>

      <p className="text-sm text-muted-foreground">
        {selected
          ? 'Perbarui data. Username dan password otomatis sinkron jika NIK atau nama diubah.'
          : 'Data anggota baru. Username: Nama Lengkap · Password: NIK'}
      </p>
    </>
  )
}