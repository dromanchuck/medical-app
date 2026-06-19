import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import styled from 'styled-components';

interface IProps {
  title: string;
  text: string;
  needTitleMargin?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const TextSection = ({
  title,
  text,
  needTitleMargin = true,
  textStyle,
}: IProps) => {
  return (
    <>
      <Title needTitleMargin={needTitleMargin}>{title}</Title>
      {text ? <SectionText style={textStyle}>{text}</SectionText> : null}
    </>
  );
};

const Title = styled(Text)<{ needTitleMargin: boolean }>`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: #262b37;
  margin-bottom: ${({ needTitleMargin }) => (needTitleMargin ? '8px' : 0)};
`;

const SectionText = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  color: #95989d;
  margin-bottom: 24px;
`;
