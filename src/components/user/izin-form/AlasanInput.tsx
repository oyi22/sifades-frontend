import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function AlasanInput({
  alasan,
  setAlasan,
  setFileSurat,
  tipe
}: any) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground">
          Alasan Izin <span className="text-destructive">*</span>
        </Label>

        <Textarea
          placeholder="Tuliskan alasan izin secara jelas..."
          value={alasan}
          onChange={(e) => setAlasan(e.target.value)}
          rows={3}
          className="text-sm resize-none"
        />

        <p className="text-[11px] text-muted-foreground text-right">
          {alasan.length}/1000 · min. 10 karakter
        </p>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground">
          Lampiran <span className="text-muted-foreground/60">(opsional)</span>
        </Label>

        <Input
          key={tipe}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg"
          className="text-xs h-9"
          onChange={(e) => setFileSurat(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  )
}