import IKind from "@itype/courses/IKind";
import IType from "@itype/courses/IType";
import ICourseSilabus from "@itype/courses/ICourseSilabus";
import ISummaryRating from "@itype/courses/ISummaryRating";
import ITags from "@itype/courses/ITags";
import ILpk from "@itype/courses/ILpk";
import ICourseDetailRequirement from "@itype/courses/ICourseDetailRequirement";
import ICourseInstructor from "@itype/courses/ICourseInstructor";
import ISimilarCourse from "@itype/courses/ISimilarCourse";

export default interface ICourse {
  uuid?: string
  title?: string
  price_before: number
  discount_start?: string
  discount_end?: string
  discount_limit?: number
  is_discount?: number
  price: number
  slug?: string
  category_id?: number
  course_type?: string
  course_kind?: string
  short_description?: string
  description?: string
  image?: string
  image_thumbnail?: string
  video_thumbnail?: any
  video_url?: string
  version?: number
  level?: string
  is_publish?: number
  draft?: any
  pass_grade?: number
  kkm?: number
  created_at?: string
  updated_at?: string
  similar_courses?: ISimilarCourse[]
  benefit?: string[]
  results?: string[]
  preparations?: string[]
  fundamentals?: string[]
  scope_contents?: any[]
  graduation_requirements?: any[]
  certificate?: any
  course_progress?: any
  summary_rating?: ISummaryRating
  rating: number
  review_count: number
  sum_rating?: string
  discount?: number
  tags?: ITags[]
  course_instructor?: ICourseInstructor[]
  lpk?: ILpk
  kind?: IKind
  type?: IType
  course_silabus?: ICourseSilabus
  course_detail_requirement?: ICourseDetailRequirement[]
}
