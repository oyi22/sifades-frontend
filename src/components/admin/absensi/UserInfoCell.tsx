export default function UserInfoCell({ user, id }: any) {
  return (
    <div className="flex flex-col">
      <span className="font-medium">
        {user?.nama_lengkap ?? '-'}
      </span>
      <span className="text-xs text-muted-foreground">
        ID: {id}
      </span>
    </div>
  )
}