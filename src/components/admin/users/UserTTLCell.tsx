export default function UserTTLCell({ user }: any) {
  return (
    <>
      {user.tempat_lahir},{' '}
      {new Date(user.tanggal_lahir).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}
    </>
  )
}