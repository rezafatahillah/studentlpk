export interface ITableResponse<T> {
    data:{
        success:boolean,
        data:Array<T>,
        current_page:number,
        first_page_url:string|null,
        from:number,
        last_page:number,
        last_page_url:string
        links:any,
        next_page_url:string,
        path:string,
        per_page:number,
        prev_page_url:string|null,
        to:number,
        total:number
    }
}