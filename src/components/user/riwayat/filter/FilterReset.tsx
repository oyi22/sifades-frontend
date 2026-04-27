import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

export default function FilterReset({ onReset }: any) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 text-xs gap-1 text-muted-foreground"
      onClick={onReset}
    >
      <RotateCcw className="w-3 h-3" />
      Reset
    </Button>
  )
}