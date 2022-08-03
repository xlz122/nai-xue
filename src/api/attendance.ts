export type Attendance = {
  points: number;
  day_name: number;
  is_day: number;
};

const list = [
  {
    points: 1,
    day_name: 1,
    is_day: 1
  },
  {
    points: 1,
    day_name: 2,
    is_day: 0
  },
  {
    points: 1,
    day_name: 3,
    is_day: 0
  },
  {
    points: 1,
    day_name: 4,
    is_day: 0
  },
  {
    points: 1,
    day_name: 5,
    is_day: 0
  },
  {
    points: 1,
    day_name: 6,
    is_day: 0
  },
  {
    points: 10,
    day_name: 7,
    is_day: 0
  }
];

/**
 * @description 获取签到列表
 */
export const attendanceList = (): Promise<Attendance[]> => {
  return new Promise(resolve => resolve(list));
};
