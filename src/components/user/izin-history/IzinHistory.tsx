import IzinHistoryItem from './IzinHistoryItem'

export default function IzinHistory({ riwayat }: any) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
        Riwayat Izin
      </h2>

      <div className="space-y-2">
        {riwayat.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Belum ada riwayat izin
          </p>
        ) : (
          riwayat.map((item: any) => (
            <IzinHistoryItem key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  )
}