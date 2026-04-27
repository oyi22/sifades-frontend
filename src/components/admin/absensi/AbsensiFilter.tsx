import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'

export function AbsensiFilter({
  tanggal, setTanggal,
  status, setStatus,
  tahunExport, setTahunExport,
  exportMutasi
}: any) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <Input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className="w-auto h-8 text-sm"
      />

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-36 h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="hadir">Hadir</SelectItem>
          <SelectItem value="izin">Izin</SelectItem>
          <SelectItem value="alpha">Alpha</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={tahunExport}
          onChange={(e) => setTahunExport(e.target.value)}
          className="w-20 h-8 text-sm"
        />
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-sm gap-1.5"
          onClick={() => exportMutasi.mutate()}
          disabled={exportMutasi.isPending}
        >
          {exportMutasi.isPending
            ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
            : <Download className="h-3.5 w-3.5" />}
          Export CSV
        </Button>
      </div>
    </div>
  )
}