import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Jabatan } from '@/types'

export default function JabatanSelect({ value, setValue }: any) {
  return (
    <Select
      value={value}
      onValueChange={(v) => setValue('jabatan', v as Jabatan)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sekretaris_desa">Sekretaris Desa</SelectItem>
        <SelectItem value="kaur">Kaur</SelectItem>
        <SelectItem value="pelayanan">Pelayanan</SelectItem>
        <SelectItem value="karyawan">Karyawan</SelectItem>
      </SelectContent>
    </Select>
  )
}