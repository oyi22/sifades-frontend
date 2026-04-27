import FilterSelect from './FilterSelect'
import FilterReset from './FilterReset'
import type { FilterState } from '@/types'

interface Props {
  filters: FilterState
  onChange: (key: keyof FilterState, value: string) => void
  onReset: () => void
}

const BULAN = [
  { value: '1', label: 'Januari' },
  { value: '2', label: 'Februari' },
  { value: '3', label: 'Maret' },
  { value: '4', label: 'April' },
  { value: '5', label: 'Mei' },
  { value: '6', label: 'Juni' },
  { value: '7', label: 'Juli' },
  { value: '8', label: 'Agustus' },
  { value: '9', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Desember' },
]

const TAHUN = Array.from({ length: 4 }, (_, i) => ({
  value: String(new Date().getFullYear() - i),
  label: String(new Date().getFullYear() - i),
}))

export function RiwayatFilter({ filters, onChange, onReset }: Props) {
  const hasFilter = Object.values(filters).some(Boolean)

  return (
    <div className="flex flex-wrap gap-2 items-center">

      <FilterSelect
        value={filters.tipe}
        onChange={(v: string) => onChange('tipe', v)}
        placeholder="Semua Tipe"
        width="w-[130px]"
        options={[
          { value: 'absensi', label: 'Absensi' },
          { value: 'izin', label: 'Izin' },
          { value: 'notif_wa', label: 'Notif WA' },
        ]}
      />

      <FilterSelect
        value={filters.status}
        onChange={(v: string) => onChange('status', v)}
        placeholder="Semua Status"
        width="w-[130px]"
        options={[
          { value: 'hadir', label: 'Hadir' },
          { value: 'pending', label: 'Pending' },
          { value: 'disetujui', label: 'Disetujui' },
          { value: 'ditolak', label: 'Ditolak' },
          { value: 'terkirim', label: 'Terkirim' },
          { value: 'gagal', label: 'Gagal' },
        ]}
      />

      <FilterSelect
        value={filters.bulan}
        onChange={(v: string) => onChange('bulan', v)}
        placeholder="Semua Bulan"
        width="w-[120px]"
        options={BULAN}
      />

      <FilterSelect
        value={filters.tahun}
        onChange={(v: string) => onChange('tahun', v)}
        placeholder="Semua Tahun"
        width="w-[100px]"
        options={TAHUN}
      />

      {hasFilter && <FilterReset onReset={onReset} />}

    </div>
  )
}