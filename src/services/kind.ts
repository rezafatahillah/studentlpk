import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import IResponse from 'types/IResponse';
import ICategorie from 'types/ICategorie';
import IKind from 'types/courses/IKind';

export default {
  getKind: async () => {
    console.log("url", PATH.baseapiurl + 'getcommoncode/COURSE_KIND');
    
    try {
      const response: AxiosResponse<IResponse<IKind>> = await axiosInstance.get(
        PATH.baseapiurl + 'getcommoncode/COURSE_KIND'
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting KIND: ${error}`);
    }
  },
};
