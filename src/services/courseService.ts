import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import {ITableResponse} from 'types/ITableResponse';
import ICardHistory from 'types/ICardHistory';
import {IMycourse} from 'types/IMycourse';
import IResponse from 'types/IResponse';
import {IAnswer, IContent, ILmsCourse, IQuis, ITopic} from 'types/ILmsCourse';
import {IBatch} from 'types/IQuestion';
import {IProgress} from 'types/IProgress';
import {INote} from 'types/ILmsNote';
import IParamsMyCourse from 'types/IParamsMyCourse';
interface payloadParams{
  columnFilters:IParamsMyCourse
}
export default {
 
  mycourse: async (params: payloadParams) => {
    console.log("MYPARAAMS",params)
    try {
      const response: AxiosResponse<ITableResponse<IMycourse>> =
        await axiosInstance.get(PATH.baseapiurl + 'courses/mycourses', 
          {params}
        );
      return response.data.data.data;
    } catch (error) {
      throw error;
    }
  },
  getcoursebyslug: (slug: string) => {
    return axiosInstance.get<any, AxiosResponse<IResponse<ILmsCourse>>>(
      PATH.baseapiurl + 'lms/course/' + slug,
    );
  },
  getcontent: (slug: string, uuid: string, content_type: string = 'MC1') => {
    type T<content_type> = content_type extends 'MC1' ? ITopic : IQuis;
    type ContentType = 'MC1' | 'MC2';
    type ContentData<T extends ContentType> = T extends 'MC1' ? ITopic : IQuis;
    return axiosInstance.get<AxiosResponse<IContent<ContentData<ContentType>>>>(
      PATH.baseapiurl + `lms/course/content/${slug}/${uuid}`,
    );
  },
  submitquis: async (
    myanswer: IAnswer[],
    batch_answer_uuid: string,
    content_uuid: string,
  ) => {
    try {
      console.log('PAYLIAD', {myanswer, batch_answer_uuid, content_uuid});
      const response: AxiosResponse<IResponse<IProgress>> =
        await axiosInstance.post(PATH.baseapiurl + 'lms/quiz/answer', {
          answers: myanswer,
          batch_answer_uuid: batch_answer_uuid,
          content_uuid: content_uuid,
        });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  submitYT: async (content_uuid: string) => {
    try {
      const response: AxiosResponse<IResponse<any>> = await axiosInstance.post(
        PATH.baseapiurl + 'lms/video/submit',
        {
          content_uuid: content_uuid,
          minutes: 0,
        },
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  submitRating: async (rate: number, comments: string, uuid: string) => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.post(
        PATH.baseapiurl + 'lms/course/isi_rating',
        {
          rating: rate,
          user_comment: comments,
          uuid: uuid,
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  submitNote: async (comments: string, uuid: string) => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.post(
        PATH.baseapiurl + 'lms/courses/note',
        {
          uuid_module_content: uuid,
          comments: comments,
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  myNotes: async (slug: string) => {
    try {
      const response: AxiosResponse<IResponse<INote[]>> =
        await axiosInstance.get(
          PATH.baseapiurl + 'lms/courses/' + slug + '/note',
        );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  updateNote: async (noteuuid: string, comment: string) => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.put(
        PATH.baseapiurl + 'lms/courses/note/' + noteuuid,
        {
          comment: comment,
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteNote: async (noteuuid: string) => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.delete(
        PATH.baseapiurl + 'lms/courses/note/' + noteuuid,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
