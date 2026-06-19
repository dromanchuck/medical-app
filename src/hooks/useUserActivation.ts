import { useEffect } from 'react';
import { authService } from 'services';

export const useUserActivation = (token?: string) => {
  useEffect(() => {
    if (token) {
      authService.activateAccout(token).catch((_error: any) => {});
    }
  }, [token]);
};
