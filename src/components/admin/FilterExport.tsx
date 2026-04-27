import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Download } from 'lucide-react'

export default function FilterExport({
  tanggal, setTanggal,
  status, setStatus,
  tahunExport, setTahunExport,
  exportMutasi
}: any) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <Input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className="w-auto"
      />

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-36">
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

      <div className="flex gap-2">
        <Input
          type="number"
          value={tahunExport}
          onChange={(e) => setTahunExport(e.target.value)}
          className="w-24"
        />

        <Button
          variant="outline"
          onClick={() => exportMutasi.mutate()}
          disabled={exportMutasi.isPending}
        >
          {exportMutasi.isPending
            ? <Loader2 className="h-4 w-4 animate-spin mr-2" />
            : <Download className="h-4 w-4 mr-2" />}
          Export CSV
        </Button>
      </div>
    </div>
  )
}