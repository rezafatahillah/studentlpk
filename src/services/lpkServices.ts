import {AxiosResponse} from 'axios';
import axiosInstance from 'config/axios';
import PATH from '@config/api';
import ILpkDetail  from 'types/couses/ILpkDetail';
import  IResponse  from 'types/IResponse';

export default {
 
  getLpkDetail: async (slug:string) => {
    try {
      const response: AxiosResponse<IResponse<ILpkDetail>> = await axiosInstance.get(
        PATH.baseapiurl + 'lpk/'+slug,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while getting courses: ${error}`);
    }
  },
};
