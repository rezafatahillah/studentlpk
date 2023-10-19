import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import {ITableResponse} from 'types/ITableResponse';
import ICourse from 'types/courses/ICourse';

export default {
  getCourses: async (params) => {
    console.log("url", PATH.baseapiurl + 'courses', {params});
    
    try {
      const response: AxiosResponse<ITableResponse<ICourse>> = await axiosInstance.get(
        PATH.baseapiurl + 'courses', {params}
      );
      return response.data.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },
};
