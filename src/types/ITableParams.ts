export interface ITableParams {
    fields?: string[];
    filters?: any[];
    perPage?: number;
    page?: number;
    sort:sortProps[];
  }
interface sortProps{
  type:string;
  field:string;
}