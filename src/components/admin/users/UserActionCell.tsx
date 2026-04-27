import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

export default function UserActionCell({ user, openEdit, openDelete }: any) {
  return (
    <>
      <Button onClick={() => openEdit(user)} size="icon">
        <Pencil />
      </Button>
      <Button onClick={() => openDelete(user)} size="icon">
        <Trash2 />
      </Button>
    </>
  )
}