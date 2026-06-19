import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

interface IProps {
  author: string;
  text: string;
  authorPosition: string;
}

export const Quote = ({ author, text, authorPosition }: IProps) => {
  return (
    <Container>
      <QuoteText>{text}</QuoteText>
      {authorPosition ? (
        <AuthorPosition>{authorPosition}</AuthorPosition>
      ) : null}
      {author ? <Author>{author}</Author> : null}
    </Container>
  );
};

const Container = styled(View)`
  padding: 24px 16px;
  background: #f7f7f7;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const QuoteText = styled(Text)`
  font-family: Raleway;
  font-style: italic;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #22b38c;
`;

const AuthorPosition = styled(Text)`
  font-family: Raleway;
  font-style: italic;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #95989d;
  padding-top: 24px;
`;

const Author = styled(Text)`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #262b37;
`;
