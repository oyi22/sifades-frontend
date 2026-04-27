import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Inbox } from 'lucide-react'
import ProfileAvatar from '@/components/user/ProfileAvatar'
import { useUserDashboard } from '@/hooks/user/useUserDashbboard'
import { useRiwayat } from '@/hooks/user/useUserRiwayat'
import { RiwayatItemCard } from '@/components/user/riwayat/card/RiwayatItemCard'
import { RiwayatFilter } from '@/components/user/riwayat/filter/RiwayatFilter'
import { RiwayatHapusDialog } from '@/components/user/riwayat/RiwayatHapusDialog'

export default function UserRiwayat() {
  const navigate = useNavigate()
  const { handleLogout }: any = useOutletContext()
  const { user } = useUserDashboard()

  const {
    items,
    pagination,
    loading,
    loadingHapus,
    filters,
    fetchRiwayat,
    fetchRingkasan,
    hapusSatu,
    hapusSemua,
    updateFilter,
    resetFilter,
  } = useRiwayat()

  useEffect(() => {
    fetchRingkasan()
    fetchRiwayat(1)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto min-h-screen flex flex-col">

        {/* Header - pakai Desain 1 */}
        <div className="bg-black px-4 pt-4 pb-16 md:pb-20">

          <div className="flex items-center justify-between mb-5">
            <h1 className="text-base md:text-lg font-semibold text-white">
              Riwayat
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-500 hover:bg-red-500/10"
            >
              Logout
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:gap-4 items-center gap-2">
            <div className="transition-transform duration-200 hover:scale-105">
              <ProfileAvatar
                currentFotoUrl={user?.foto_profile_url}
                namaLengkap={user?.nama_lengkap}
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-sm md:text-base font-medium text-white">
                {user?.nama_lengkap}
              </h2>
              <p className="text-xs text-white/50 mt-0.5">
                {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })}
              </p>
            </div>
          </div>

        </div>

        {/* Body - pakai Desain 1, isi konten pakai logic Desain 2 */}
        <div className="bg-white rounded-t-[28px] -mt-7 flex-1 shadow-xl">

          {/* Tab Navigator - pakai Desain 1 */}
          <div className="px-4 pt-4 mb-2 md:max-w-md">
            <div className="relative flex items-center bg-zinc-100 rounded-2xl p-1 h-11">
              <span
                className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-black transition-transform duration-300"
                style={{ transform: 'translateX(100%)' }}
              />
              <button
                onClick={() => navigate('/user/dashboard')}
                className="relative z-10 flex-1 text-sm font-medium h-full rounded-xl text-zinc-500 hover:text-zinc-800"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/user/riwayat')}
                className="relative z-10 flex-1 text-sm font-medium h-full rounded-xl text-white"
              >
                Riwayat
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 md:grid md:grid-cols-2 md:gap-4">
            <div className="md:col-span-2 md:p-4 md:rounded-2xl md:border md:border-black/5 md:shadow-sm space-y-4">

              {/* Action bar: Filter + Hapus Semua */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <RiwayatFilter
                  filters={filters}
                  onChange={updateFilter}
                  onReset={resetFilter}
                />
                {items.length > 0 && (
                  <RiwayatHapusDialog
                    label="Hapus Semua"
                    onConfirm={() => hapusSemua(filters.tipe || undefined)}
                    loading={loadingHapus === 'all'}
                  />
                )}
              </div>

              {/* List Riwayat */}
              <div className="space-y-3">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-xl" />
                  ))
                ) : items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-3 text-muted-foreground">
                    <Inbox className="w-10 h-10 opacity-30" />
                    <div>
                      <p className="font-medium">Belum ada riwayat</p>
                      <p className="text-xs mt-1">Aktivitas absensi dan izin kamu akan muncul di sini</p>
                    </div>
                  </div>
                ) : (
                  items.map(item => (
                    <RiwayatItemCard
                      key={item.id}
                      item={item}
                      onHapus={hapusSatu}
                      loadingHapus={loadingHapus === item.id}
                    />
                  ))
                )}
              </div>

              {/* Pagination */}
              {pagination && pagination.last_page > 1 && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.current_page <= 1 || loading}
                    onClick={() => fetchRiwayat(pagination.current_page - 1)}
                  >
                    Sebelumnya
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {pagination.current_page} / {pagination.last_page}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.current_page >= pagination.last_page || loading}
                    onClick={() => fetchRiwayat(pagination.current_page + 1)}
                  >
                    Berikutnya
                  </Button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}