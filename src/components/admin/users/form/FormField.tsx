import { Label } from '@/components/ui/label'

export default function FormField({
  label,
  children,
  error
}: any) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && (
        <p className="text-xs text-destructive">{error.message}</p>
      )}
    </div>
  )
}