import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearInternalError, selectInternalError } from 'core';

export const useOnInternalError = (callback: () => void) => {
  const internalError = useSelector(selectInternalError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (internalError) {
      callback();

      requestAnimationFrame(() => {
        dispatch(clearInternalError());
      });
    }
  }, [internalError, dispatch, callback]);
};
