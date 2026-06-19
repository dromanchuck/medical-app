import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components';

import { authService } from 'services';
import { useQuery } from 'react-query';

const getUserWordEnding = (count: number) => {
  const countArr = String(count).split('');

  if (countArr.length === 1) {
    return countArr[0] === '1' ? 'пользователь' : 'пользователей';
  } else if (count === 11) {
    return 'пользователей';
  } else {
    return countArr[1] === '1' ? 'пользователь' : 'пользователей';
  }
};

export const UsersCount = () => {
  const { isLoading, data } = useQuery(
    'count',
    authService.getUsersCount.bind(authService),
  );

  const count = data?.users_count || 0;

  return isLoading ? (
    <Loader />
  ) : count > 0 ? (
    <UserCountText>
      {count} {getUserWordEnding(count)} в системе
    </UserCountText>
  ) : null;
};

const UserCountText = styled(Text)`
  margin-top: 40px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #22b38c;
`;

const Loader = styled(ActivityIndicator)`
  margin-top: 40px;
`;
