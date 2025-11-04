export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
