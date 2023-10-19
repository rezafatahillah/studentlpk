import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import IResponse from 'types/IResponse';
import ICategorie from 'types/ICategorie';
import ILevel from 'types/courses/ILevel';

export default {
  getLevel: async () => {
    console.log("url", PATH.baseapiurl + 'getcommoncode/COURSE_KIND');
    
    try {
      const response: AxiosResponse<IResponse<ILevel>> = await axiosInstance.get(
        PATH.baseapiurl + 'getcommoncode/COURSE_LEVEL'
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting Level: ${error}`);
    }
  },
};
