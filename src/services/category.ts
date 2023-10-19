import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import IResponse from 'types/IResponse';
import ICategorie from 'types/ICategorie';

export default {
  getCategory: async () => {
    console.log("url", PATH.baseapiurl + 'category');
    
    try {
      const response: AxiosResponse<IResponse<ICategorie>> = await axiosInstance.get(
        PATH.baseapiurl + 'category'
      );
      return response.data.data.data;
    } catch (error) {
      throw new Error(`Error while getting category: ${error}`);
    }
  },
};
