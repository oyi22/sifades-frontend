import { Dialog, DialogContent } from '@/components/ui/dialog'

import ValidasiHeader from '@/components/admin/izin/aksi/ValidasiHeader'
import ValidasiInfo from '@/components/admin/izin/aksi/ValidasiInfo'
import CatatanField from '@/components/admin/izin/aksi/CatatanField'
import ValidasiFooter from '@/components/admin/izin/aksi/ValidasiFooter'

export default function ValidasiDialog({
  open,
  setOpen,
  selected,
  aksi,
  catatan,
  setCatatan,
  validasiMutasi
}: any) {
  const isSetuju = aksi === 'disetujui'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>

        <ValidasiHeader isSetuju={isSetuju} />

        <div className="space-y-4">
          <ValidasiInfo selected={selected} />

          <CatatanField
            isSetuju={isSetuju}
            catatan={catatan}
            setCatatan={setCatatan}
          />
        </div>

        <ValidasiFooter
          isSetuju={isSetuju}
          catatan={catatan}
          setOpen={setOpen}
          validasiMutasi={validasiMutasi}
        />

      </DialogContent>
    </Dialog>
  )
}