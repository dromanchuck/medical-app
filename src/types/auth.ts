import { ISelectItem } from './select';
import { IUser } from './user';

export type TGender = 'man' | 'woman';

export type TRegisterStepOneParams = { isDoctor: boolean };

export type TRegisterStepTwoParams = {
  fullName: string;
  birthday: string;
  phone: string;
  email: string;
  password: string;
  gender: TGender;
};

export type TRegisterStepThreeParams = TRegisterStepTwoParams & {
  study: string;
  position: string;
  speciality: ISelectItem;
  degree: ISelectItem | null;
};

export interface IRegisterDoctorValues extends TRegisterStepThreeParams {
  country: ISelectItem;
  region: ISelectItem | null;
  city: ISelectItem;
}

export interface IRegisterPatientValues extends TRegisterStepTwoParams {}

export type TRole = 'doc' | 'pat';

export interface IApiRegisterPatientValues {
  email: string;
  full_name: string;
  phone_number: string;
  gender: TGender;
  date_of_birth: string;
  role: TRole;
  password: string;
  source: 'mob' | 'web';
}

export interface IApiRegisterDoctorValues extends IApiRegisterPatientValues {
  region: string;
  additional_specialty: string;
  position: string;
  academic_degree: string;
  country: string;
  city: string;
  specialty: string;
  working_place: string;
}

export interface IAuthPayloadType extends IUser {
  role: TRole;
  authorized?: boolean;
}
