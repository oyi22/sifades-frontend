import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function CatatanField({
  isSetuju,
  catatan,
  setCatatan
}: any) {
  return (
    <div className="space-y-1">
      <Label>
        Catatan Admin
        {!isSetuju && <span className="text-red-500 ml-1">*</span>}
      </Label>

      <Textarea
        placeholder={isSetuju ? 'Opsional...' : 'Wajib isi alasan penolakan...'}
        value={catatan ?? ''}
        onChange={(e) => setCatatan(e.target.value)}
        rows={3}
      />
    </div>
  )
}