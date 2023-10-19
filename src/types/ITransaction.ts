export default interface ITransaction {
    id: number
    invoice_number: string
    payment_amount: string
    trx_status: string
    status_transaksi: string
    status_midtrans: string
    title: string
    item_qty: number
    lpk_name: string
    price: string
    instructor: string
    lpk_logo: string
    course_logo: string
    snap_token: any
    created_at: string
}