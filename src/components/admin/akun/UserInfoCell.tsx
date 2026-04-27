function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function UserInfoCell({ user }: any) {
  const nama = user?.nama_lengkap ?? '-'
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 text-[11px] font-medium flex items-center justify-center flex-shrink-0">
        {getInitials(nama)}
      </div>
      <div>
        <p className="text-sm font-medium leading-tight">{nama}</p> 
      </div>
    </div>
  )
}