import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import UserAvatarCell from '@/components/admin/users/UserAvatarCell'
import UserTTLCell from '@/components/admin/users/UserTTLCell'
import UserActionCell from '@/components/admin/users/UserActionCell'
import PaginationControl from '@/components/admin/users/PaginationControl'

export default function UserTable({
  users,
  isLoading,
  page,
  totalPages,
  search,
  openEdit,
  openDelete,
  setPage
}: any) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Foto</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>NIK</TableHead>
            <TableHead>Tempat Tanggal Lahir</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>No WA</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <Loader2 className="animate-spin mx-auto" />
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                {search ? 'Tidak ditemukan' : 'Kosong'}
              </TableCell>
            </TableRow>
          ) : (
            users.map((user: any, i: number) => (
              <TableRow key={user.id}>

                <TableCell>
                  {(page - 1) * 10 + i + 1}
                </TableCell>

                <TableCell>
                  <UserAvatarCell user={user} />
                </TableCell>

                <TableCell>{user.nama_lengkap}</TableCell>

                <TableCell>{user.nik}</TableCell>

                <TableCell>
                  <UserTTLCell user={user} />
                </TableCell>

                <TableCell>{user.alamat}</TableCell>

                <TableCell>
                  <Badge>{user.jabatan}</Badge>
                </TableCell>

                <TableCell>{user.no_wa}</TableCell>

                <TableCell>
                  <UserActionCell
                    user={user}
                    openEdit={openEdit}
                    openDelete={openDelete}
                  />
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <PaginationControl totalPages={totalPages} setPage={setPage} />
    </>
  )
}