import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export default function ValidasiInfo({ selected }: any) {
  return (
    <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-lg space-y-1">
      <p className="font-semibold text-zinc-800">
        {selected?.user?.nama_lengkap}
      </p>

      <p className="text-sm text-zinc-500 capitalize">
        Tipe:{' '}
        <span className="font-medium text-zinc-700">
          {selected?.tipe}
        </span>
      </p>

      {selected?.tanggal_mulai && (
        <p className="text-sm text-zinc-500">
          Tanggal:{' '}
          <span className="font-medium text-zinc-700">
            {format(new Date(selected.tanggal_mulai), 'dd MMM yyyy', { locale: id })}
            {selected.tanggal_mulai !== selected.tanggal_selesai &&
              ` – ${format(new Date(selected.tanggal_selesai), 'dd MMM yyyy', { locale: id })}`
            }
          </span>
        </p>
      )}

      {selected?.alasan && (
        <p className="text-sm text-zinc-500">
          Alasan:{' '}
          <span className="text-zinc-700">
            {selected.alasan}
          </span>
        </p>
      )}
    </div>
  )
}