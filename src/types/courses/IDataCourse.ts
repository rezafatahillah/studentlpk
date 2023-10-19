import ICourse from "@itype/courses/ICourse";
export default interface Data {
  current_page: number;
  data: ICourse[];
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string;
  links: string[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
