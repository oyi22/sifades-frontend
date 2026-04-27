export default function StatusCard({ sudahAbsen, izinHariIni }: any) {
  const state = sudahAbsen ? 'done' : izinHariIni ? 'izin' : 'none'

  const config = {
    done: {
      title: 'Sudah Absen',
      desc: 'Kehadiran sudah tercatat',
    },
    izin: {
      title: 'Izin Diajukan',
      desc: `Status: ${izinHariIni?.status ?? '-'}`,
    },
    none: {
      title: 'Belum Absen',
      desc: 'Silakan lakukan absensi',
    },
  }[state]

  return (
    <div className="text-sm">
       
      <div className="mb-2">
        <span className="font-semibold">
          {config.title}
        </span>
      </div> 
      <p className="text-muted-foreground text-sm">
        {config.desc}
      </p>

    </div>
  )
}