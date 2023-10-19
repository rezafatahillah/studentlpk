export interface ILpkDetail {
  uuid?: string
  name?: string
  slug?: string
  email?: string
  email_verified_at?: string
  is_active?: number
  completed_at?: string
  is_complete?: number
  created_at?: string
  updated_at?: string
  courses_count?: number
  instructors_count?: number
  student_count?: number
  rating?: number
  lpk_detail?: LpkDetail
  transaction_details?: TransactionDetail[]
}

export interface LpkDetail {
  id: number
  cover_photo: string
  phone: string
  logo: string
  description: string
  is_complete: number
  completed_at: string
  created_at: string
  updated_at: string
}

export interface TransactionDetail {
  id: number
  transaction_id: number
  lpk_id: number
  product_id: number
  product_type: string
  amount: string
  voucher_id: any
  discount_percentage: any
  created_at: string
  updated_at: string
  transaction: Transaction
}

export interface Transaction {
  id: number
  uuid: string
  student_id: number
  invoice_number: string
  payment_amount: string
  payment_method: string
  admin_fee: string
  trx_status: string
  status_midtrans: string
  notification_midtrans: any
  discount_id: any
  discount_amount: any
  created_at: string
  updated_at: string
  snap_token: any
}
