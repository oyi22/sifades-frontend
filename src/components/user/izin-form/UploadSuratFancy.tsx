import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, CheckCircle2 } from 'lucide-react'

export default function UploadSuratFancy({
  fileSurat,
  setFileSurat,
  tipe
}: any) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        Upload Surat <span className="text-destructive">*</span>
      </Label>

      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg py-5 px-4 cursor-pointer transition-colors ${
          fileSurat
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-border bg-muted/40 hover:bg-muted'
        }`}
      >
        <Input
          key={tipe}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg"
          className="hidden"
          id="file-upload"
          onChange={(e) => setFileSurat(e.target.files?.[0] ?? null)}
        />

        {fileSurat ? (
          <>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700 text-center break-all">
              {fileSurat.name}
            </span>
          </>
        ) : (
          <>
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground text-center">
              Klik untuk upload
              <br />
              <span className="text-[11px]">PDF, DOC, JPG · maks 5MB</span>
            </span>
          </>
        )}
      </label>
    </div>
  )
}