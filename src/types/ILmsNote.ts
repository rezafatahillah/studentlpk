

export interface INote {
  id: number
  uuid: string
  course_id: number
  sequence: number
  title: string
  version: number
  created_at: string
  updated_at: string
  module_contents: INoteModule[]
}

export interface INoteModule {
  id: number
  uuid: string
  module_id: number
  content_type: string
  source_id: number
  sequence: number
  version: number
  created_at: string
  updated_at: string
  content: INoteContent
  student_note: IStudentNote[]
}

export interface INoteContent {
  id: number
  uuid: string
  title: string
  resource_type?: string
  content?: string
  version: number
  is_free?: number
  is_active?: number
  course_id: number
  created_at: string
  updated_at: string
  description?: string
  duration: any
  repeat_limit: any
  minimum_score?: number
  quiz_status: any
}

export interface IStudentNote {
  id: number
  uuid: string
  student_id: number
  module_content_id: number
  comments: string
  comment_pos: any
  created_at: string
  updated_at: string
}
