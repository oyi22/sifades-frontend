import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function TanggalRange({
  tanggalMulai,
  setTanggalMulai,
  tanggalSelesai,
  setTanggalSelesai
}: any) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground">
          Tanggal Mulai
        </Label>
        <Input
          type="date"
          min={today}
          value={tanggalMulai}
          onChange={(e) => {
            setTanggalMulai(e.target.value)
            if (tanggalSelesai < e.target.value) setTanggalSelesai(e.target.value)
          }}
          className="text-sm h-9"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground">
          Tanggal Selesai
        </Label>
        <Input
          type="date"
          min={tanggalMulai || today}
          value={tanggalSelesai}
          onChange={(e) => setTanggalSelesai(e.target.value)}
          className="text-sm h-9"
        />
      </div>
    </div>
  )
}