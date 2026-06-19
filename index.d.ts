declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  import { ImageRequireSource } from 'react-native';

  const content: ImageRequireSource;
  export default content;
}
