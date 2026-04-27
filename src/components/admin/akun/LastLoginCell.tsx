export default function LastLoginCell({ lastLogin }: { lastLogin: string | null }) {
  return (
    <span className="text-sm text-muted-foreground">
      {lastLogin
        ? new Date(lastLogin).toLocaleString()
        : 'Belum pernah login'}
    </span>
  )
}