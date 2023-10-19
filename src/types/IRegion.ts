export interface IProvince {
  
  country_code: string;
  is_active: number;
  last_process: string;
  province_altcode?: string;
  province_code: string;
  province_name: string;
  region_qode: string;

}

export interface ICity {
  id: string;
  name: string;
}

export interface IDistrict {
  id: string;
  name: string;
}

export interface IVillage {
  id: string;
  name: string;
}