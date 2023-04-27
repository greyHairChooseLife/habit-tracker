export type Day = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export interface Habit {
  id: number;
  name: string;
  description: string;
  days: Day[];
}

export interface WeekRecord {
  habitId: Habit['id'];
  checkedDays: Partial<{ [key in Day]: boolean }>;
}
