export type NewUser = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  _id?: string;
} & NewUser;
