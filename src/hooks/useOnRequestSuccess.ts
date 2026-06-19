import { EmptyActionCreator, PayloadAction } from 'typesafe-actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback, useMemo } from 'react';

import { clearSuccessByActionType } from 'core';
import { TStore } from 'core';

type ActionCreator = (payload: any) => PayloadAction<string, any>;

export function useOnRequestSuccess(
  action: EmptyActionCreator<string> | ActionCreator,
  onSuccess: Function,
): { success: boolean | null; clearSuccessStatus: () => void } {
  const key = String(action).replace('_REQUEST', '');
  const dispatch = useDispatch();

  const clearSuccessStatus = useCallback(() => {
    dispatch(clearSuccessByActionType(key));
  }, [dispatch, key]);

  const success = useSelector(
    (state: TStore) => state.successReducer[key] || null,
  );

  useEffect(() => {
    if (success === true && typeof onSuccess === 'function') {
      onSuccess?.();
      clearSuccessStatus();
    }
  }, [clearSuccessStatus, onSuccess, success]);

  useEffect(() => {
    return clearSuccessStatus;
  }, [clearSuccessStatus]);

  return useMemo(
    () => ({
      success,
      clearSuccessStatus,
    }),
    [clearSuccessStatus, success],
  );
}
