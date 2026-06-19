import { TRole, TGender } from './auth';

export interface IApiUser {
  email: string;
  full_name: string;
  country: string;
  region: string;
  city: string;
  specialty: string;
  additional_specialty: string;
  phone_number: string;
  gender: TGender;
  date_of_birth: string;
  working_place: string;
  position: string;
  academic_degree: 'pdm' | 'md';
  role: TRole;
  verified: boolean;
}

export interface IUser {
  email: string;
  fullName: string;
  verified?: boolean;
}

export interface IApiUsersCount {
  users_count: number;
}

export interface ILoginUser {
  email: string;
  password: string;
}
