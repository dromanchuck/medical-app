import { useCallback, useState } from 'react';

export const useFormErrors = (defaultState: { [key: string]: string }) => {
  const [errors, setErrors] = useState(defaultState);

  const resetError = useCallback(
    (key: keyof typeof errors) => {
      if (errors[key]) {
        setErrors(errorValues => ({ ...errorValues, [key]: '' }));
      }
    },
    [errors],
  );

  return { resetError, errors, setErrors };
};
