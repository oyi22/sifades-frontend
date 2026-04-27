import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import TipeIzinSelector from './TipeIzinSelector'
import TanggalRange from './TanggalRange'
import UploadSuratFancy from './UploadSuratFancy'
import AlasanInput from './AlasanInput'

import type { TipeIzin } from '@/hooks/user/useUserIzin'

const TIPE_INFO = {
  dinas:   { label: 'Izin Dinas',   maxHari: 2, suratWajib: true },
  sakit:   { label: 'Izin Sakit',   maxHari: 5, suratWajib: true },
  lainnya: { label: 'Izin Lainnya', maxHari: 2, suratWajib: false },
}

const TIPE_STYLE = {
  dinas:   'border-blue-500 bg-blue-50 text-blue-700',
  sakit:   'border-amber-500 bg-amber-50 text-amber-700',
  lainnya: 'border-green-600 bg-green-50 text-green-700',
}

const TIPE_DEFAULT = 'border-border bg-muted text-muted-foreground hover:bg-accent'

export default function IzinFormCard(props: any) {
  const {
    tipe, setTipe,
    tanggalMulai, setTanggalMulai,
    tanggalSelesai, setTanggalSelesai,
    alasan, setAlasan,
    fileSurat, setFileSurat,
    submit, loading, sisaSlot,
  } = props

  const info = TIPE_INFO[tipe as TipeIzin] ?? TIPE_INFO.lainnya

  const isValid = () => {
    if (!tanggalMulai || !tanggalSelesai) return false
    if (info.suratWajib && !fileSurat) return false
    if (!info.suratWajib && alasan.length < 10) return false
    return true
  }

  return (
    <Card className="border-border shadow-none">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground">
            Form Izin
          </CardTitle>

          {tipe !== 'dinas' && (
            <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-medium">
              Sisa {sisaSlot}/3 slot
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-4">

        <TipeIzinSelector
          tipe={tipe}
          setTipe={setTipe}
          info={info}
          TIPE_INFO={TIPE_INFO}
          TIPE_STYLE={TIPE_STYLE}
          TIPE_DEFAULT={TIPE_DEFAULT}
        />

        <TanggalRange
          tanggalMulai={tanggalMulai}
          setTanggalMulai={setTanggalMulai}
          tanggalSelesai={tanggalSelesai}
          setTanggalSelesai={setTanggalSelesai}
        />

        {info.suratWajib ? (
          <UploadSuratFancy
            fileSurat={fileSurat}
            setFileSurat={setFileSurat}
            tipe={tipe}
          />
        ) : (
          <AlasanInput
            alasan={alasan}
            setAlasan={setAlasan}
            setFileSurat={setFileSurat}
            tipe={tipe}
          />
        )}

        <Button
          className="w-full h-9 text-sm font-medium"
          onClick={submit}
          disabled={!isValid() || loading}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Kirim Pengajuan
        </Button>

      </CardContent>
    </Card>
  )
}