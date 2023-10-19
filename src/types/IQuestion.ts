import { IQuis } from "./ILmsCourse"

export interface IBatch {
    batch: Batch
    content: IQuis
  }
  
  export interface Batch {
    uuid: string
    sum_point: number
    batch_status: string
    question_qty: number
    pass_grade: number
    kkm: number
  }
  
  
  export interface Question {
    id: number
    quiz_id: number
    uuid: string
    question: string
    question_type: string
    options: Option[]
    version: number
    created_at: string
    updated_at: string
  }
  
  export interface Option {
    id: number
    question_id: number
    option_content: string
  }
  