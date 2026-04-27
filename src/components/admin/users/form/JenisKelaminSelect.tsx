import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function JenisKelaminSelect({ value, setValue }: any) {
  return (
    <Select
      value={value || ''}
      onValueChange={(v) => setValue('jenis_kelamin', v)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="L">Laki-laki</SelectItem>
        <SelectItem value="P">Perempuan</SelectItem>
      </SelectContent>
    </Select>
  )
}