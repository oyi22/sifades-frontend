import PageHeader from '@/components/shared/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAdminIzin } from '@/hooks/admin/useAdminIzin'
import IzinTable from '@/components/admin/izin/IzinTable'
import ValidasiDialog from '@/components/admin/izin/aksi/ValidasiDialog'
import PerpanjangDialog from '@/components/admin/PerpanjangDialog'

export default function AdminIzin() {
  const {
    statusFilter, setStatusFilter,
    izinList, isLoading,
    selected, open, setOpen,
    aksi, catatan, setCatatan,
    openValidasi, validasiMutasi,
    perpanjangOpen, setPerpanjangOpen,
    perpanjangTarget,
    tanggalSelesaiBaru, setTanggalSelesaiBaru,
    openPerpanjang, perpanjangMutasi,
    notifOpen, setNotifOpen,
    notifTarget, notifData, notifLoading,
    openNotif,
    hapusMutasi,
  } = useAdminIzin()

  return (
    <div>
      <PageHeader
        title="Validasi Izin"
        description="Kelola dan validasi pengajuan izin anggota"
      />

      <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="disetujui">Disetujui</TabsTrigger>
          <TabsTrigger value="ditolak">Ditolak</TabsTrigger>
          <TabsTrigger value="all">Semua</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="border-zinc-200">
        <CardContent className="p-0">
          <IzinTable
            izinList={izinList}
            isLoading={isLoading}
            openValidasi={openValidasi}
            openPerpanjang={openPerpanjang}
            openNotif={openNotif}
            notifOpen={notifOpen}
            setNotifOpen={setNotifOpen}
            notifTarget={notifTarget}
            notifData={notifData}
            notifLoading={notifLoading}
            hapusMutasi={hapusMutasi}
          />
        </CardContent>
      </Card>

      <ValidasiDialog
        open={open}
        setOpen={setOpen}
        selected={selected}
        aksi={aksi}
        catatan={catatan}
        setCatatan={setCatatan}
        validasiMutasi={validasiMutasi}
      />

      <PerpanjangDialog
        open={perpanjangOpen}
        setOpen={setPerpanjangOpen}
        target={perpanjangTarget}
        tanggal={tanggalSelesaiBaru}
        setTanggal={setTanggalSelesaiBaru}
        mutasi={perpanjangMutasi}
      />
    </div>
  )
}