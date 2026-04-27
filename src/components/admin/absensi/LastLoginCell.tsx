export default function LastLoginCell({ lastLogin }: { lastLogin: string | null }) {
  return (
    <span className="text-[11.5px] text-muted-foreground tabular-nums">
      {lastLogin ? new Date(lastLogin).toLocaleString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }) : 'Belum login'}
    </span>
  )
}