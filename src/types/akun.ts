import type { User } from "@/types/user";

export interface Akun {
  id: number
  user?: User
  username: string
  password_plain: string
  is_active: boolean
  last_login: string | null
}

export interface AkunResponse {
  data: Akun[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

 