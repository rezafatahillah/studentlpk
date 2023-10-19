import colors from './colors';

export const statusdic = {
  TRX0: {
    textcolor: colors.danger500,
    bgcolor: 'danger',
  },
  TRX1: {
    textcolor: colors.warning500,
    bgcolor: 'warning',
  },
  TRX2: {
    textcolor: colors.success700,
    bgcolor: 'success',
  },
};
export interface IFilterCourse {
  title: string;
  value: string;
  progress?: number;
}
export const filterCourse: IFilterCourse[] = [
  {
    title: 'Semua',
    value: ' ',
  },
  {
    title: 'Sedang Berjalan',
    value: 'ES1',
  },
  {
    title: 'Belum Memberikan Ulasan',
    value: 'ES4',
    progress: 100,
  },
  {
    title: 'Selesai',
    value: 'ES2',
  },
];
