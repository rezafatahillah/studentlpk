import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import IResponse from 'types/IResponse';
import { ITableParams } from 'types/ITableParams';
import {LpkRating} from 'types/IRating';

export default {
  getRating: async (slug: string) => {
   const baseURL =  PATH.baseapiurl + 'lpk/rating/' + slug
   console.log(baseURL);
   
    try {
      const response: AxiosResponse<IResponse<LpkRating>> = await axiosInstance.get(
        PATH.baseapiurl + 'lpk/rating/' + slug 
      )
      
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting rate: ${error}`);
    }
    
  },
};
