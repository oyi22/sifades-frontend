import { Label } from '@/components/ui/label'
import type { TipeIzin } from '@/hooks/user/useUserIzin'

export default function TipeIzinSelector({
  tipe,
  setTipe,
  info,
  TIPE_INFO,
  TIPE_STYLE,
  TIPE_DEFAULT
}: any) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Tipe Izin
      </Label>

      <div className="grid grid-cols-3 gap-2">
        {(['dinas', 'sakit', 'lainnya'] as TipeIzin[]).map((t) => (
          <button
            key={t}
            onClick={() => setTipe(t)}
            className={`text-xs font-medium py-2 px-1 rounded-md border transition-all ${
              tipe === t ? TIPE_STYLE[t] : TIPE_DEFAULT
            }`}
          >
            {TIPE_INFO[t].label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2">
        <span className="text-xs text-muted-foreground">
          Maks. <strong className="text-foreground">{info.maxHari} hari</strong>
          {' · '}
          {info.suratWajib ? 'Surat wajib' : 'Surat tidak wajib'}
        </span>
      </div>
    </div>
  )
}