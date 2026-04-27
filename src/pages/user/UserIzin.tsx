import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUserIzin } from '@/hooks/user/useUserIzin'
import IzinFormCard from '@/components/user/izin-form/IzinFormCard'
import IzinStatusCard from '@/components/user/IzinStatusCard'
import IzinHistory from '@/components/user/izin-history/IzinHistory'

export default function UserIzin() {
  const navigate = useNavigate()

  const {
    tipe, setTipe,
    tanggalMulai, setTanggalMulai,
    tanggalSelesai, setTanggalSelesai,
    alasan, setAlasan,
    fileSurat, setFileSurat,
    riwayat,
    sisaSlot,
    izinAktif,
    submit,
    loading,
  } = useUserIzin()

  return (
    <div className="max-w-xl mx-auto border-x border-border min-h-screen bg-muted/30">
 
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md"
          onClick={() => navigate('/user/dashboard')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-sm font-semibold">Pengajuan Izin</h1>
      </div>

      <div className="p-4 space-y-4">

        {!izinAktif ? (
          <IzinFormCard
            tipe={tipe}
            setTipe={setTipe}
            tanggalMulai={tanggalMulai}
            setTanggalMulai={setTanggalMulai}
            tanggalSelesai={tanggalSelesai}
            setTanggalSelesai={setTanggalSelesai}
            alasan={alasan}
            setAlasan={setAlasan}
            fileSurat={fileSurat}
            setFileSurat={setFileSurat}
            submit={submit}
            loading={loading}
            sisaSlot={sisaSlot}
          />
        ) : (
          <IzinStatusCard data={izinAktif} />
        )}

        <IzinHistory riwayat={riwayat} />

      </div>
    </div>
  )
}