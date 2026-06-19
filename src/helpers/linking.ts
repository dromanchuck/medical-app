import { Linking } from 'react-native';

export const openURL = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  }
};

export const sendEmail = async (email: string) => {
  const supported = await Linking.canOpenURL(`mailto:${email}`);

  if (supported) {
    await Linking.openURL(`mailto:${email}`);
  }
};
