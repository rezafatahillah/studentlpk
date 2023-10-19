export default interface ICardHistory {
  id: number;
  invoice_number: string;
  payment_amount: number;
  trx_status: string;
  status_transaksi: string;
  status_midtrans: null | string;
  title: string;
  item_qty: number;
  lpk_name: string;
  price: number;
  instructor: string;
  lpk_logo: string;
  course_logo: string;
  snap_token: null | string;
  created_at: string;
}
