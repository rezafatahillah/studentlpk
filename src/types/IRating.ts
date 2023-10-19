export interface Rating {
  reviews: Review[]
  rating: number
  review_count: number
  sum_rating: string
  discount: number
}

export interface Review {
  id: number
  student_id: number
  user_comment: string
  rating: number
  rating_time: string
  created_at: string
  course_id: number
  admin_reply: any
  reply_time: any
  student: Student
  lpk: any
}

export interface Student {
  firstname: string
  lastname: string
  student_profile: StudentProfile
}

export interface StudentProfile {
  student_id: number
  avatar: any
}

export interface ILpkRatingSummary {
  total_ulasan: string,
  avg_rating: string,
}
export interface ILpkRating {
  rating: string,
  user_comment: string,
  admin_reply: string,
  //reply_time: string,
  student_id: string,
  student_name: string,
  course_name: string,
  slug: string,
  course_id: string,
  course_logo: string,
  lpk_name: string,
  rating_time: string,
  
}

export interface ILpkData{
  data: ILpkRating,
  rating_summary: ILpkRatingSummary,
  rating_det: ILpkRatingDet,
}

export interface ILpkRatingDet{
  r_1: string,
  r_2: string,
  r_3: string,
  r_4: string,
  r_5: string,
}