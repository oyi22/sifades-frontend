import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2 } from 'lucide-react'
import StatusBadge from '@/components/admin/akun/StatusBadge'
import UserInfoCell from '@/components/admin/akun/UserInfoCell'
import LastLoginCell from '@/components/admin/akun/LastLoginCell'
import AkunActions from '@/components/admin/akun/AkunActions'

export default function AkunTable({
  akuns,
  isLoading,
  toggleMutasi,
  resetMutasi,
  deleteMutasi
}: any) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs text-muted-foreground font-medium">No</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">User</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">Username</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">Last Login</TableHead>
            <TableHead className="text-right text-xs text-muted-foreground font-medium w-[100px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center">
                <Loader2 className="animate-spin mx-auto text-muted-foreground" />
              </TableCell>
            </TableRow>
          ) : akuns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                Tidak ada data akun
              </TableCell>
            </TableRow>
          ) : (
            akuns.map((a: any, index: number) => (
              <TableRow
                key={a.id}
                className="hover:bg-muted/40 transition-colors"
              >
                <TableCell className="font-medium text-muted-foreground">
                  {index + 1}
                </TableCell>

                <TableCell>
                  <UserInfoCell user={a.user} id={a.id} />
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {a.username}
                </TableCell>

                <TableCell>
                  <StatusBadge isActive={a.is_active} />
                </TableCell>

                <TableCell>
                  <LastLoginCell lastLogin={a.last_login} />
                </TableCell>

                <TableCell className='text-right pr-3'>
                  <AkunActions
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