import { EmptyActionCreator, PayloadAction } from 'typesafe-actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback, useMemo } from 'react';

import { TStore, clearErrorByActionType } from 'core';

type ActionCreator = (payload: any) => PayloadAction<string, any>;

export function useOnRequestError(
  action: EmptyActionCreator<string> | ActionCreator,
  onError: (error: any) => void,
): { error: Error | null; clearError: () => void } {
  const key = String(action).replace('_REQUEST', '');
  const dispatch = useDispatch();
  const error = useSelector((state: TStore) => state.errorReducer[key] || null);

  const clearError = useCallback(() => {
    dispatch(clearErrorByActionType(key));
  }, [dispatch, key]);

  useEffect(() => {
    if (error && typeof onError === 'function') {
      onError?.(error);
      clearError();
    }
  }, [onError, clearError, error]);

  useEffect(() => {
    return clearError;
  }, [clearError]);

  return useMemo(
    () => ({
      error,
      clearError,
    }),
    [clearError, error],
  );
}
