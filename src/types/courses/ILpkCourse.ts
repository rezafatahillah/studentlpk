export interface Data {
  current_page: number
  data: ThisCourse[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface ThisCourse {
  title: string
  slug: string
  price_before: string
  price: string
  is_discount: number
  uuid: string
  image: string
  image_thumbnail: string
  video_thumbnail: any
  course_type: string
  course_kind: string
  rating: number
  review_count: number
  sum_rating: string
  discount: number
  course_instructor: CourseInstructor[]
  type: Type
  kind: Kind
  lpk: Lpk
}

export interface CourseInstructor {
  created_at: string
  updated_at: string
  instructors: Instructors
}

export interface Instructors {
  id: number
  slug: any
  firstname: string
  lastname: string
  email: string
  phone: string
  cover_image: string
  profession: string
  photo: string
  facebook: string
  instagram: string
  linkedin: string
  twitter: string
  medium: string
  youtube: string
  is_active: number
  description: string
  created_at: string
  updated_at: string
}

export interface Type {
  id: number
  code_name: string
  sequence: number
  label: string
  group_name: string
  description: string
  is_active: number
  created_by: string
  created_at: any
  updated_at: any
}

export interface Kind {
  id: number
  code_name: string
  sequence: number
  label: string
  group_name: string
  description: string
  is_active: number
  created_by: string
  created_at: any
  updated_at: any
}

export interface Lpk {
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
  lpk_detail: LpkDetail
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

export interface Link {
  url?: string
  label: string
  active: boolean
}