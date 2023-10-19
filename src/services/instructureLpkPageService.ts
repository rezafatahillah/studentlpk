import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import {ITableResponse} from 'types/ITableResponse';
import IInstructors from 'types/courses/IInstructors';

export default {
  getInstructor: async (params) => {
    try {
      const response: AxiosResponse<ITableResponse<IInstructors>> = await axiosInstance.get(
        PATH.baseapiurl + 'instructor', {params},
      );
      return response.data.data.data;
    } catch (error) {
      throw new Error(`Error while getting instructor: ${error}`);
    }
  },
};
