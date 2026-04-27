export interface ApiResponse<T> {
    success: boolean
    message?: string
    data: T
}

export interface FilterState {
    tipe: string
    status: string
    bulan: string
    tahun: string
}