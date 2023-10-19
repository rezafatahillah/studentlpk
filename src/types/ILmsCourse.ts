import { Batch, Question } from "./IQuestion"

export interface IQuis {
  id: number
  uuid: string
  course_id: number
  title: string
  description: string
  duration: any
  repeat_limit: any
  minimum_score: number
  version: number
  quiz_status: any
  created_at: string
  updated_at: string
  questions: Question[]
  resource_type: string
}
export interface ITopic {
  id: number
  uuid: string
  title: string
  resource_type: string
  content: string
  version?: number
  is_free?: number
  is_active?: number
  course_id?: number
  created_at?: string
  updated_at?: string
}
export interface IAnswer {
  answer_id: number | null
  question_uuid: string
}
export interface IModuleContent<T> {
  content: T;
  content_type: string;
  contenthide: false;
  id: number;
  module_id: string;
  progress: {
    course_id: number;
    finish_at: string | null;
    module_content_id: number;
    progress_point: number;
    progress_status: string;
    started_at: string | null;
    version: number;
  };
  sequence: string;
  source_id: string;
  uuid: string;
}
export interface IModule {
  course_id: number;
  id: number;
  module_content:IModuleContent<ITopic|IQuis>[];
  sequence: number;
  title: string;
  uuid: string;
}
export interface ILmsCourse {
  course_title: string;
  coursedata: Array<IModule>;
  is_rated: false;
  progress: number;
  uuid:string;
}

export interface IContent<T>{
  content:T|null,
  batch?:Batch
}
