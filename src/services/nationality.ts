// import {Axios, AxiosResponse} from 'axios';
// import axiosInstance from 'config/axios';
// import PATH from '@config/api';
// import IResponse from 'types/IResponse';
// import INationality from 'types/INationality';

//   export default {
//     nationality: async() => {
//       try{
//         const response: AxiosResponse<IResponse<INationality>>  = await axiosInstance.get(
//         PATH.baseapiurl + 'nationality')
//           return response.data.data;
//       } catch (error){
//         throw new Error(`Error while getting profile: ${error}`);
//       }
//     }
//   }

import axios from 'axios';
import PATH from '@config/api';

class NationalityService {
  private headers: any;

  constructor(headers: any) {
    this.headers = headers;
  }

  public async nationality(): Promise<any> {
    try {
      const response = await axios.get(PATH.baseapiurl + 'nationality', { headers: this.headers });
      const natinality = response.data.data.data;
      return natinality;
    } catch (error) {
      throw new Error(`Error while getting profile: ${error}`);
    }
  }
}

export default NationalityService;