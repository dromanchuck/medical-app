import React from 'react';

import {
  iframeModel,
  useHtmlIframeProps,
  HTMLIframe,
} from '@native-html/iframe-plugin';

import {
  CustomRendererProps,
  HTMLContentModel,
  HTMLElementModel,
  MixedStyleDeclaration,
  TBlock,
} from 'react-native-render-html';
import { StyleSheet } from 'react-native';

export const htmlStylesContent: Readonly<
  Record<string, MixedStyleDeclaration>
> = {
  p: {
    color: '#000',
    textAlign: 'left',
  },
  span: {
    color: '#000',
    textAlign: 'left',
  },
  div: {
    color: '#000',
    textAlign: 'left',
  },
};

const fontElementModel = HTMLElementModel.fromCustomModel({
  tagName: 'font',
  contentModel: HTMLContentModel.mixed,
  getUADerivedStyleFromAttributes({ face, color }) {
    let style: any = { textAlign: 'left' };
    if (face) {
      style.fontFamily = face;
    }
    if (color) {
      style.color = color;
    }

    return style;
  },
});

const IframeRenderer = (props: CustomRendererProps<TBlock>) => {
  const iframeProps = useHtmlIframeProps(props);

  return (
    <HTMLIframe {...iframeProps} style={[iframeProps.style, style.iframe]} />
  );
};

const style = StyleSheet.create({
  iframe: {
    left: -20,
  },
});

export const renderers = {
  iframe: IframeRenderer,
};

export const customHTMLElementModels = {
  font: fontElementModel,
  iframe: iframeModel,
};
