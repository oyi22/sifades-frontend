import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2 } from 'lucide-react'
import StatusBadge from '@/components/admin/absensi/StatusBadge'
import UserInfoCell from '@/components/admin/absensi/UserInfoCell'
import LastLoginCell from '@/components/admin/absensi/LastLoginCell'
import AbsensiActions from '@/components/admin/absensi/AbsensiAction'

export default function AbsensiTable({ akuns, isLoading, toggleMutasi, resetMutasi, deleteMutasi }: any) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[42px] text-xs font-medium text-muted-foreground">No</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground">User</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground">Username</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground">Status</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground">Last login</TableHead>
            <TableHead className="text-right text-xs font-medium text-muted-foreground w-[100px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center">
                <Loader2 className="animate-spin mx-auto text-muted-foreground w-4 h-4" />
              </TableCell>
            </TableRow>
          ) : !akuns || akuns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            akuns.map((a: any, index: number) => (
              <TableRow key={a.id} className="hover:bg-muted/40 transition-colors">
                <TableCell className="text-[11px] text-muted-foreground">{index + 1}</TableCell>
                <TableCell><UserInfoCell user={a.user} id={a.id} /></TableCell>
                <TableCell className="text-[12px] text-muted-foreground">{a.username}</TableCell>
                <TableCell><StatusBadge isActive={a.is_active} /></TableCell>
                <TableCell><LastLoginCell lastLogin={a.last_login} /></TableCell>
                <TableCell className="text-right pr-3">
                  <AbsensiActions
                    a={a}
                    toggleMutasi={toggleMutasi}
                    resetMutasi={resetMutasi}
                    deleteMutasi={deleteMutasi}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}