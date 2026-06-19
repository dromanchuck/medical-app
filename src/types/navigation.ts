import { DrawerScreenProps } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { IPublication, IPublicationCategory } from './publication';

import {
  TRegisterStepOneParams,
  TRegisterStepThreeParams,
  TRegisterStepTwoParams,
} from './auth';

import { TAlgorithmParams } from './algorithms';

export enum EScreens {
  Welcome = 'Welcome',
  RegisterStepOne = 'RegisterStepOne',
  RegisterStepTwo = 'RegisterStepTwo',
  RegisterStepThree = 'RegisterStepThree',
  DoctorMain = 'DoctorMain',
  Algorithms = 'Algorithms',
  Library = 'Library',
  About = 'About',
  Feedback = 'Feedback',
  Publications = 'Publications',
  DrugCalculator = 'DrugCalculator',
  Publication = 'Publication',
  Drawer = 'Drawer',
  PatientMain = 'PatientMain',
  Login = 'Login',
  ForgotPassword = 'ForgotPassword',
  SetNewPassword = 'SetNewPassword',
  Algorithm = 'Algorithm',
  Drug = 'Drug',
  DrugCompatibility = 'DrugCompatibility',
  DrugSideEffects = 'DrugSideEffects',
}

type TDrawerParams = { isDoctor?: boolean };

type TLinkingToken = { token?: string };

export type TRootStackParamList = {
  [EScreens.Welcome]: undefined;
  [EScreens.RegisterStepOne]: TRegisterStepOneParams;
  [EScreens.RegisterStepTwo]: TRegisterStepTwoParams;
  [EScreens.RegisterStepThree]: TRegisterStepThreeParams;
  [EScreens.Drawer]?: TDrawerParams;
  [EScreens.Publications]: IPublicationCategory;
  [EScreens.Publication]: IPublication;
  [EScreens.Login]: undefined;
  [EScreens.ForgotPassword]: undefined;
  [EScreens.SetNewPassword]?: TLinkingToken;
  [EScreens.Algorithm]: TAlgorithmParams;
  [EScreens.Feedback]?: { screenName: string };
  [EScreens.DrugCalculator]: undefined;
  [EScreens.Drug]: undefined;
  [EScreens.DrugCompatibility]: undefined;
  [EScreens.DrugSideEffects]: undefined;
};

export type TDrawerParamList = {
  [EScreens.DoctorMain]?: TLinkingToken;
  [EScreens.About]: undefined;
  [EScreens.Feedback]?: { screenName: string };
  [EScreens.Library]: undefined;
  [EScreens.Algorithms]: undefined;
  [EScreens.Publications]: IPublicationCategory;
  [EScreens.PatientMain]?: TLinkingToken;
  [EScreens.Algorithm]: TAlgorithmParams;
  [EScreens.DrugCalculator]: undefined;
  [EScreens.Drug]: undefined;
  [EScreens.DrugCompatibility]: undefined;
  [EScreens.DrugSideEffects]: undefined;
};

export type TScreenProps<T extends EScreens> = NativeStackScreenProps<
  TRootStackParamList,
  T
>;

export type TDrawerScreenProps<T extends EScreens> = DrawerScreenProps<
  TDrawerParamList,
  T
>;
