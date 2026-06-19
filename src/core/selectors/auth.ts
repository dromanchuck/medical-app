import { createSelector } from 'reselect';

import { TStore } from '../types';

export const selectRole = createSelector(
  (state: TStore) => state.authReducer,
  ({ role }) => role,
);

export const selectAuthorized = createSelector(
  (state: TStore) => state.authReducer,
  ({ authorized }) => authorized,
);

export const selectInternalError = createSelector(
  (state: TStore) => state.authReducer,
  ({ internalError }) => internalError,
);

export const selectProfile = createSelector(
  (state: TStore) => state.authReducer,
  auth => auth,
);
