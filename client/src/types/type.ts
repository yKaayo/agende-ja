export type User = {
  name: string;
  email: string;
  authenticated?: boolean;
};

export type Schedule = {
  availableTimes: string[];
  date: Date;
};

export type UserData = {
  status: boolean;
  data: Schedule[] | null;
};

export type UserSchedule = {
  _id: string;
  time: string;
  date: Date;
};
