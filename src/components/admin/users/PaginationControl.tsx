import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function PaginationControl({ totalPages, setPage }: any) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-between mt-4">
      <Button onClick={() => setPage((p: number) => p - 1)}>
        <ChevronLeft />
      </Button>
      <Button onClick={() => setPage((p: number) => p + 1)}>
        <ChevronRight />
      </Button>
    </div>
  )
}