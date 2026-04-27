import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function UserAvatarCell({ user }: any) {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage
        src={
          user.foto_profile
            ? `http://192.168.1.13:8000/storage/${user.foto_profile}`
            : undefined
        }
      />
      <AvatarFallback>
        {user.nama_lengkap?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}