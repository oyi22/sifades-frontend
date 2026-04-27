import { useState, useCallback } from 'react'
import type { RiwayatItem, RiwayatPaginated, RiwayatRingkasan, FilterState } from '@/types/index'
import { toast } from 'sonner'
import { getRiwayat, getRingkasanRiwayat, hapusRiwayatSatu, hapusSemuaRiwayat } from '@/api/riwayat'

export function useRiwayat() {
  const [items, setItems]         = useState<RiwayatItem[]>([])
  const [pagination, setPagination] = useState<Omit<RiwayatPaginated, 'data'> | null>(null)
  const [ringkasan, setRingkasan] = useState<RiwayatRingkasan | null>(null)
  const [loading, setLoading]     = useState(false)
  const [loadingHapus, setLoadingHapus] = useState<number | 'all' | null>(null)
  const [filters, setFilters]   = useState<FilterState>({
    tipe: '', status: '', bulan: '', tahun: '',
  })

  const fetchRiwayat = useCallback(async (page = 1, overrideFilters?: Partial<FilterState>) => {
    setLoading(true)
    try {
      const activeFilters = { ...filters, ...overrideFilters }
      const params: Record<string, string | number> = { page }
      if (activeFilters.tipe)   params.tipe   = activeFilters.tipe
      if (activeFilters.status) params.status  = activeFilters.status
      if (activeFilters.bulan)  params.bulan   = activeFilters.bulan
      if (activeFilters.tahun)  params.tahun   = activeFilters.tahun

      const res = await getRiwayat(params)
      const { data, ...pag } = res.data
      setItems(data)
      setPagination(pag)
    } catch {
      toast.error('Gagal memuat riwayat')
    } finally {
      setLoading(false)
    }
  }, [filters])

  const fetchRingkasan = useCallback(async () => {
    try {
      const res = await getRingkasanRiwayat()
      setRingkasan(res.data)
    } catch {
      // silent
    }
  }, [])

  const hapusSatu = useCallback(async (id: number) => {
    setLoadingHapus(id)
    try {
      await hapusRiwayatSatu(id)
      setItems(prev => prev.filter(i => i.id !== id))
      setRingkasan(prev => prev ? { ...prev, total: prev.total - 1 } : prev)
      toast.success('Riwayat dihapus')
    } catch {
      toast.error('Gagal menghapus riwayat')
    } finally {
      setLoadingHapus(null)
    }
  }, [])

  const hapusSemua = useCallback(async (tipe?: string) => {
    setLoadingHapus('all')
    try {
      await hapusSemuaRiwayat(tipe)
      if (tipe) {
        setItems(prev => prev.filter(i => i.tipe !== tipe))
      } else {
        setItems([])
      }
      await fetchRingkasan()
      toast.success('Riwayat berhasil dihapus semua')
    } catch {
      toast.error('Gagal menghapus semua riwayat')
    } finally {
      setLoadingHapus(null)
    }
  }, [fetchRingkasan])

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
    fetchRiwayat(1, updated)
  }, [filters, fetchRiwayat])

  const resetFilter = useCallback(() => {
    const reset: FilterState = { tipe: '', status: '', bulan: '', tahun: '' }
    setFilters(reset)
    fetchRiwayat(1, reset)
  }, [fetchRiwayat])

  return {
    items,
    pagination,
    ringkasan,
    loading,
    loadingHapus,
    filters,
    fetchRiwayat,
    fetchRingkasan,
    hapusSatu,
    hapusSemua,
    updateFilter,
    resetFilter,
  }
}