import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import StatusBadge from '@/components/admin/izin/StatusBadge'
import AlasanPopover from '@/components/admin/izin/AlasanPopover'
import IzinActions from '@/components/admin/izin/IzinAction'
import DeleteIzinDialog from '@/components/admin/izin/DeleteIzinDialog'
import NotifDialog from '@/components/admin/izin/NotifDialog'

export default function IzinTable({
  izinList,
  isLoading,
  openValidasi,
  openPerpanjang,
  openNotif,
  notifOpen,
  setNotifOpen,
  notifTarget,
  notifData,
  notifLoading,
  hapusMutasi,
}: any) {
  const [targetHapus, setTargetHapus] = useState<any>(null)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-50">
            <TableHead>Nama</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Alasan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Catatan</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <Loader2 className="animate-spin mx-auto" />
              </TableCell>
            </TableRow>
          ) : izinList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-zinc-400">
                Tidak ada pengajuan izin
              </TableCell>
            </TableRow>
          ) : (
            izinList.map((item: any) => (
              
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.user?.nama_lengkap ?? '-'}
                </TableCell>

                <TableCell>
                  {item.tanggal_mulai
                    ? format(new Date(item.tanggal_mulai), 'dd MMM yyyy', { locale: id })
                    : '-'}
                  {item.tanggal_selesai && item.tanggal_selesai !== item.tanggal_mulai && (
                    <span className="text-zinc-400">
                      {' '}– {format(new Date(item.tanggal_selesai), 'dd MMM yyyy', { locale: id })}
                    </span>
                  )}
                </TableCell>

                <TableCell>
                   <AlasanPopover alasan={item.alasan} fileSurat={item.file_surat} />
                </TableCell>

                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>

                <TableCell>
                  {item.catatan_admin ?? '-'}
                </TableCell>

                <TableCell className="text-right">
                  <IzinActions
                    item={item}
                    openValidasi={openValidasi}
                    openPerpanjang={openPerpanjang}
                    openNotif={openNotif}
                    setTargetHapus={setTargetHapus}
                  />
                </TableCell>
              </TableRow> 
            ))
          )}
        </TableBody>
      </Table>

      <DeleteIzinDialog
        targetHapus={targetHapus}
        setTargetHapus={setTargetHapus}
        hapusMutasi={hapusMutasi}
      />
 
      <NotifDialog
        open={notifOpen}
        setOpen={setNotifOpen}
        target={notifTarget}
        notifData={notifData}
        notifLoading={notifLoading}
      />
    </>
  )
}