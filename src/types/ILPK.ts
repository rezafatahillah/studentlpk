
export interface Root {
  success: boolean
  data: Data
}

export interface Data {
  current_page: number
  data: DataDetail[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: DataLink[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface DataDetail {
  uuid: string
  name: string
  slug: string
  email: string
  email_verified_at?: string
  is_active: number
  completed_at?: string
  is_complete: number
  created_at: string
  updated_at: string
  rating: number
  lpk_detail: LpkDetail
}

export interface LpkDetail{
  logo:string;
}

export interface DataLink {
  url?: string
  label: string
  active: boolean
}
