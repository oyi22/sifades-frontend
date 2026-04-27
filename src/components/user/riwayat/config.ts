import { CalendarCheck, FileText, Bell, CheckCircle2, Clock, XCircle, Wifi, WifiOff } from 'lucide-react'

export const TIPE_CONFIG = {
  absensi: {
    icon: CalendarCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    label: 'Absensi',
  },
  izin: {
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    label: 'Izin',
  },
  notif_wa: {
    icon: Bell,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    label: 'Notif WA',
  },
}

export const STATUS_CONFIG: Record<
  string,
  {
    label: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
    icon: any
  }
> = {
  hadir: { label: 'Hadir', variant: 'default', icon: CheckCircle2 },
  izin: { label: 'Izin', variant: 'secondary', icon: Clock },
  alpha: { label: 'Alpha', variant: 'destructive', icon: XCircle },
  pending: { label: 'Pending', variant: 'outline', icon: Clock },
  disetujui: { label: 'Disetujui', variant: 'default', icon: CheckCircle2 },
  ditolak: { label: 'Ditolak', variant: 'destructive', icon: XCircle },
  terkirim: { label: 'Terkirim', variant: 'default', icon: Wifi },
  gagal: { label: 'Gagal', variant: 'destructive', icon: WifiOff },
}