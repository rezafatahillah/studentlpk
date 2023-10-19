import ILpkDetail from "@itype/courses/ILpkDetail";

export default interface ILpk{
    uuid: string
    name: string
    slug: string
    email: string
    email_verified_at: string
    is_active: number
    completed_at: string
    is_complete: number
    created_at: string
    updated_at: string
    rating: number
    lpk_detail: ILpkDetail
}