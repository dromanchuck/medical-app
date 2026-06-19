import Config from 'react-native-config';

export const linkingConfig = {
  prefixes: [Config.APP_SCHEME],
  config: {
    screens: {
      Drawer: {
        path: 'activation',
        screens: {
          DoctorMain: 'doc/:token',
          PatientMain: 'pat/:token',
        },
      },
      SetNewPassword: 'reset_password/:token',
    },
  },
};
