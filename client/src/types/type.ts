export type User = {
  name: string;
  email: string;
  authenticated?: boolean;
};

export type Schedule = User & {
  _id?: string;
  date: string;
  time: string;
};

export type UserData = {
  status: boolean;
  data: Schedule[] | null;
};
