import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export default function PageHeader({ title, subtitle, action }: any) {
  return (
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">{title}</h1>
          <p className="text-sm text-zinc-500 mt-0.5 capitalize">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {action}
          
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-zinc-600"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>
  )
}