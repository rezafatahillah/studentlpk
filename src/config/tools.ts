import {ILmsCourse, IModule, IModuleContent} from 'types/ILmsCourse';
import {INote} from 'types/ILmsNote';

export interface CurrentContent {
  uuid?: string;
  content_type?: string;
  progress_status?: string;
  is_rated?: boolean;
}
export interface INoteUI {
  title: string;
  uuid: string;
  notes: NoteUI[];
}

export interface NoteUI {
  title: string;
  comments: string;
  uuid:string;
  created_at: string;
}

export const toCurrency = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getFirstIncompleteModuleContentUUID = (
  courseData: IModule[],
): CurrentContent => {
  for (let module of courseData) {
    for (let moduleContent of module.module_content) {
      if (moduleContent.progress.progress_status !== 'PS3') {
        return {
          uuid: moduleContent.uuid,
          content_type: moduleContent.content_type,
          progress_status: moduleContent.progress.progress_status,
        };
      }
    }
  }
  return {};
};

export const groupDataByUUID = (data: INote[]): INoteUI[] => {
  const result = {};
  data.forEach(item => {
    const uuid = item.uuid;
    if (!result[uuid]) {
      result[uuid] = {
        title: item.title,
        uuid: uuid,
        notes: [],
      };
    }
    item.module_contents.forEach(module => {
      const title = module.content.title;
      module.student_note.forEach(note => {
        result[uuid].notes.push({
          title: title,
          comments: note.comments,
          uuid:note.uuid,
          created_at: note.created_at,
        });
      });
     
    });
  });
  const resultArray = Object.values(result) as INoteUI[];
  return resultArray;
};

export const formatDate = (dateString: string): string => {
  dateString = dateString[0] ?? '';
  const formattedDateString = dateString.replace(" ", "T").replace(/(\.\d+)?[^\dZ]/g, '');
  
  const date = new Date(formattedDateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date).toUpperCase();
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${day} ${month} ${year} ${hours}:${minutes}`;
};
