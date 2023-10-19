import { AxiosResponse } from 'axios';
import axiosInstance from 'config/axios';
import ICourse from 'types/courses/ICourse';
import { ITableParams } from 'types/ITableParams';
import ICategorie from 'types/ICategorie';
import PATH from '@config/api';
import { ITableResponse } from 'types/ITableResponse';
import IResponseCourse from '@itype/courses/IResponseCourse';
import IReview from 'types/courses/IReview';
import IRating from 'types/courses/IRating';
import IResponse from 'types/IResponse';
import IResponseString from 'types/IResponseString';
import { ICertificate } from 'types/ICertificate';
import { ILpkDetail } from 'types/ILpkDetail';
import { ILpkData, ILpkRating } from 'types/IRating';
import { DataDetail, DataLink, Data } from 'types/ILPK';

export default {
  getCourses: async (params?: ITableParams) => {
    try {
      const response: AxiosResponse<ITableResponse<ICourse>> = await axiosInstance.get(
        PATH.baseapiurl + 'courses',
        { params },
      );
      return response.data.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },

  getCourses2: async (params?: ITableParams) => {
    try {
      const response: AxiosResponse<ITableResponse<ICourse>> = await axiosInstance.get(
        PATH.baseapiurl + 'courses',
        { params },
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },

  getSnapToken: async (params: Object) => {

    try {
      const response: AxiosResponse<IResponseString> = await axiosInstance.post(
        PATH.baseapiurl + 'transaction/purchase',
        params,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },
  getCourseDetail: async (urlslug: string) => {
    try {
      const response: AxiosResponse<IResponseCourse<ICourse>> = await axiosInstance.get(
        PATH.baseapiurl + 'courses/detail/' + urlslug,
        // { params }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },
  getRating: async (slug: string, star: string) => {
    const baseURL = PATH.baseapiurl + 'courses/rating/' + slug +"/"+star
    // console.log(baseURL);

    try {
      const response: AxiosResponse<IResponseCourse<IRating>> = await axiosInstance.get(
        PATH.baseapiurl + 'courses/rating/' + slug + "/" + star
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },
  getCategories: async (params?: ITableParams) => {
    try {
      const response: AxiosResponse<ITableResponse<ICategorie>> = await axiosInstance.get(
        PATH.baseapiurl + 'category',
        { params },
      );
      return response.data.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },


  //certificate
  getCertificateCourse: async (urlslug: string) => {
    try {
      const response: AxiosResponse<IResponseCourse<ICertificate>> = await axiosInstance.get(
        PATH.baseapiurl + 'certificate/mycertificate/course/' + urlslug,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },

  //LPK
  getLpk: async (params?: ITableParams) => {
    const baseURL = PATH.baseapiurl + 'lpk' +params;
    // console.log(baseURL);

    try {
      
      const response: AxiosResponse<IResponse<Data>> = await axiosInstance.get(
        PATH.baseapiurl + 'lpk',
        { params },
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting LPK List: ${error}`);
    }
  },

  getLpkDetail: async (slug: string) => {
    try {
      
      const response: AxiosResponse<IResponse<ILpkDetail>> = await axiosInstance.get(
        PATH.baseapiurl + 'lpk/' + slug,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },

  getLpkRating: async (slug: string, star: string) => {
    const baseURL = PATH.baseapiurl + 'lpk/rating/' + slug +"/"+star
    // console.log(baseURL);

    try {
      const response: AxiosResponse<IResponse<ILpkData>> = await axiosInstance.get(
        PATH.baseapiurl + 'lpk/rating/' + slug + "/" + star
      )

      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting rate: ${error}`);
    }

  },


};
