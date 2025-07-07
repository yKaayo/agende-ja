export type Schedule = {
  _id?: string;
  name: string;
  email: string;
  date: string;
  time: string;
};

export type UserData = {
  status: boolean;
  data: Schedule[] | null;
};
