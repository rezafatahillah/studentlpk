import ITags from "@itype/courses/ITags";
import ICourseInstructor from "@itype/courses/ICourseInstructor";
import ILpk from "@itype/courses/ILpk";
import IKind from "@itype/courses/IKind";
import IType from "@itype/courses/IType";

export default interface ISimilarCourse{
    uuid: string
    title: string
    price_before: string
    discount_start?: string
    discount_end?: string
    discount_limit?: number
    is_discount: number
    price: string
    slug: string
    category_id: number
    course_type: string
    course_kind: string
    short_description: string
    description: string
    image: string
    image_thumbnail: string
    video_thumbnail: any
    video_url: string
    version: number
    level: string
    is_publish: number
    draft: any
    pass_grade: number
    kkm: number
    created_at: string
    updated_at: string
    rating: number
    review_count: number
    sum_rating: any
    discount: number
    tags: ITags[]
    course_instructor: ICourseInstructor[]
    lpk: ILpk
    kind: IKind
    type: IType
}