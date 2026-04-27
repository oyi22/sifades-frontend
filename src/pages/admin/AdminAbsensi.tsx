import PageHeader from '@/components/shared/PageHeader'
import { useAdminAbsensi } from '@/hooks/admin/useAdminAbsensi'
import { useAdminIzin } from '@/hooks/admin/useAdminIzin'
import RekapCard from '@/components/admin/RekapCard'
import FilterExport from '@/components/admin/FilterExport'
import AbsensiTable from '@/components/admin/absensi/AbsensiTable'

export default function AdminAbsensi() {
  const {
    tanggal, setTanggal,
    status, setStatus,
    tahunExport, setTahunExport,
    rekapData,
    exportMutasi,
  } = useAdminAbsensi()

  const {
    izinList,
    isLoading,
    openValidasi,
    hapusMutasi,
  } = useAdminIzin()

  return (
    <div className="space-y-4">
      <PageHeader
        title="Data Absensi"
        description="Rekap dan monitoring kehadiran anggota"
      />

      <RekapCard rekapData={rekapData} />

      <FilterExport
        tanggal={tanggal}
        setTanggal={setTanggal}
        status={status}
        setStatus={setStatus}
        tahunExport={tahunExport}
        setTahunExport={setTahunExport}
        exportMutasi={exportMutasi}
      />
 
      <div className="rounded-lg border overflow-hidden">
        <AbsensiTable
          izinList={izinList}
          isLoading={isLoading}
          openValidasi={openValidasi}
          hapusMutasi={hapusMutasi}
        />
      </div>
    </div>
  )
}