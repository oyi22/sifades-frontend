import KehadiranChart from '@/components/admin/dashboard/KehadiranChart'
import IzinPendingCard from '@/components/admin/dashboard/IzinPending'
import RecentActivityCard from '@/components/admin/dashboard/RecentActivityCard'

export default function Core(props: any) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <KehadiranChart {...props} />
        <IzinPendingCard {...props} />
      </div>

      <RecentActivityCard {...props} />
    </>
  )
}