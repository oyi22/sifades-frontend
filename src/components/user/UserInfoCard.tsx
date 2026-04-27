import { Badge } from '@/components/ui/badge'

export default function UserInfoCard({ user }: any) {
  const fields = [
    { label: 'NIK', value: user?.nik },
    { label: 'Alamat', value: user?.alamat },
    { label: 'Jabatan', value: user?.jabatan },
  ]

  return (
    <div className="text-sm">
       
      <div className="mb-3">
        <h2 className="font-semibold">Data Diri</h2>
      </div>
 
      <div className="space-y-3">
        {fields.map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-start gap-4"
          >
            <span className="text-muted-foreground">
              {item.label}
            </span>

            <span className="font-medium text-right max-w-[60%] break-words">
              {item.value ?? '-'}
            </span>
          </div>
        ))} 
        <div className="flex justify-between items-center gap-4 pt-2">
          <span className="text-muted-foreground">Status</span>

          <Badge className="bg-black text-white hover:bg-black/90 text-xs px-2.5 py-0.5 rounded-md">
            {user?.jabatan ?? '-'}
          </Badge>
        </div>
      </div>
    </div>
  )
}