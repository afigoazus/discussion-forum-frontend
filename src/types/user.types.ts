export interface Login {
  token: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface UserResponse {
  status: string;
  message: string;
  data: User;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: Login;
}

export interface GetAllUsersResponse {
  status: string;
  message: string;
  data: User[];
}
